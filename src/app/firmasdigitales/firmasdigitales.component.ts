import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnDestroy, HostListener, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import SignaturePad from 'signature_pad';
import { DOCUMENT } from '@angular/common';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { interval, Subscription } from 'rxjs';

//SERVICIOS BLOB
import { BlobUploadsViewStateService } from '../azure-storage/services/blob-uploads-view-state.service';
import { BlobSharedViewStateService } from '../azure-storage/services/blob-shared-view-state.service';

import { environment } from 'src/environments/environment';
import { PedidoFirmasService } from '../shared/svcPedidos/pedido-firmas.service';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from '../shared/svcPedidos/pedido.service';

import { Apimodel } from '../models/modelGeneral/apimodel'
import { PedidoToken } from '../models/modelReporteVentas/pedido-token'



@Component({
  selector: 'app-firmasdigitales',
  templateUrl: './firmasdigitales.component.html',
  styleUrls: ['./firmasdigitales.component.css'],
  animations: [
    trigger('animacionIconoTouch', [
      state('inicio', style({
      })),
      state('fin', style({
      })),
      transition('inicio => fin', [
        animate('1000ms ease-in', keyframes([
          style({ transform: 'rotate(-30deg)' }),
          style({ transform: 'rotate(0deg)' })
        ]))
      ]),
      transition('fin => inicio', [
        animate('1000ms ease-out', keyframes([
          style({ transform: 'rotate(0deg)' }),
          style({ transform: 'rotate(-30deg)' })
        ]))
      ])
    ])
  ]

})
export class FirmasdigitalesComponent implements OnInit, OnDestroy {
  contenedorCanvas!: HTMLElement
  canvas!: HTMLCanvasElement
  elem: any; isFullScreen!: boolean
  estadoAnimacion!: boolean

  pedidoToken!: PedidoToken
  mensajeConfirmacion!: string

  flagScreen: number = 0;
  //SUSCRIPCIONES
  subidaImagenesSubscription$!: Subscription
  intervaloAnimacion$!: Subscription
  cargarDetalleFirmaDigital$!: Subscription

  //Flags
  flagEnvio: boolean = false
  urlImagen!: string
  progresoImagen: number = 0

  @ViewChild('sPad')
  signaturePadElement!: { nativeElement: HTMLCanvasElement }
  signaturePad!: any;

  constructor(
    private svcPedidos: PedidoService,
    private routeActive: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private blobUpload: BlobUploadsViewStateService,
    private blobShared: BlobSharedViewStateService,
    private elRef:ElementRef,
    @Inject(DOCUMENT) private document: any
  ) {
  }
  cargarCanvas(): void {
    if (this.pedidoToken.urlImagenFirma == '') {
      setTimeout(() => {
        this.chkScreenMode();
        this.contenedorCanvas = <HTMLElement>document.getElementById("contenedor-canvas");
        this.canvas = <HTMLCanvasElement>document.getElementById("responsive-canvas");
        this.elem = <HTMLElement>document.getElementById("contenedor-canvas");
        //SIGNATURE
        this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement, {
          minWidth: 0.5,
          maxWidth: 1.0,
          penColor: "rgb(66, 133, 244)"
        });
        this.canvas.setAttribute("width", this.contenedorCanvas.offsetWidth.toString())
        this.canvas.setAttribute("height", "300")
        this.estadoAnimacion = true
        const intervalAnimation = interval(1000)
        this.intervaloAnimacion$ = intervalAnimation.subscribe((val) => {
          this.toggleAnimation()
        })
      }, 50);
      //FULLSCREEN
      //this.canvas.resizeTo(this.contenedorCanvas.offsetWidth,this.contenedorCanvas.offsetHeight)
      /*canvas.width  = contenedor.offsetWidth;
      canvas.height = contenedor.offsetHeight;*/
      let fullscreenButton = <any>document.getElementById("fullscreen-button");
      let fullscreenDiv = <any>document.getElementById("fullscreen");
      let fullscreenFunc = fullscreenDiv?.requestFullscreen;

      if (!fullscreenFunc && fullscreenFunc != null) {
        ['mozRequestFullScreen',
          'msRequestFullscreen',
          'webkitRequestFullScreen'].forEach(function (req) {
            fullscreenFunc = fullscreenFunc || fullscreenDiv[req];
          });
      }

      function enterFullscreen() {
        fullscreenFunc.call(fullscreenDiv);
      }

      fullscreenButton?.addEventListener('click', enterFullscreen);
    }
  }
  ngOnDestroy(): void {
    this.intervaloAnimacion$.unsubscribe()
    this.subidaImagenesSubscription$.unsubscribe()
  }

  ngOnInit(): void {
    //Obtenemos el token desde la ruta activa
      this.routeActive.url.subscribe(val=>{
        let token = val[0].path 
        this.cargarDetalleFirmaDigital$ = this.svcPedidos.obtenerPedidoPorToken(token).subscribe(
          (res: Apimodel)=>{
            if(res.Error="200"){
              this.pedidoToken = res.Resultado[0]
              this.cargarCanvas()
              
            }
          }
        )  
      })
    
    //BLOB STORAGE
    //Inicializamos el contenedor del blob storage
    this.blobShared.getContainerItems('contenedor-sip')
    //this.blobShared.getContainerItems('sgdcontainer')
    //this.blobShared.getContainerItems('contenedor-sip-new')

    
    //Nos suscribimos a la subida de archivos
    this.subidaImagenesSubscription$ = this.blobUpload.uploadedItems$.subscribe(val => {
      let item = val[val.length - 1]
      this.flagEnvio = true

      if (item.progress == 100) {
        this.progresoImagen= item.progress
        let urlImagenFirma = environment.urlBlobStorage+item.containerName+'/'+item.filename
        this.svcPedidos.actualizarFirmaPedido(this.pedidoToken.idPedido, urlImagenFirma).subscribe(
          (res: Apimodel)=>{
            if(res.Error="200"){
              this.mensajeConfirmacion = res.Resultado[0].respuesta
              this.signaturePad.off()
            }else{
            }
          }
        )
      } else {
        this.progresoImagen= item.progress
      }
    })
    
  }

  
//METODOS GENERALES
  enviarFirma() {
    if (this.signaturePad.isEmpty()) {
      this.openSnackBar()
    } else {
      const dataURL = this.signaturePad.toDataURL();
      this.download(dataURL, 'firmaDigital_'+this.pedidoToken.nombreCompleto+'_Pedido_'+this.pedidoToken.idPedido+'_.png');
    }
  }
  limpiar() {
    this.signaturePad.clear();
  }
  atras() {
    const data = this.signaturePad.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      this.signaturePad.fromData(data);
    }
     
  }

  onResize(event: any) {
    this.canvas?.setAttribute("width", this.contenedorCanvas?.offsetWidth.toString())
    if (this.isFullScreen == true) {
      this.canvas?.setAttribute("height", this.contenedorCanvas?.offsetHeight.toString())
    } else {
      this.canvas?.setAttribute("height", "300")
    }
  }

  
  //METODOS para la subida de imagen al BLOB STORAGE
  download(dataURL: string, filename: string) {
    if (navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') === -1) {
      window.open(dataURL);
    } else {
      const blob = this.dataURLToBlob(dataURL);
      const imgFile = new File([blob], filename, { type: 'application/octet-stream' })
      let list = new DataTransfer()
      list.items.add(imgFile)
      let myFileList = list.files
      this.subirImagenBlob(myFileList)

      /*const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);*/
    }
  }
  subirImagenBlob(imagen: FileList) {
    this.blobUpload.uploadItems(imagen);
  }
  dataURLToBlob(dataURL: string) {
    // Code taken from https://github.com/ebidel/filer.js
    const parts = dataURL.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  }

  dataURItoBlob(dataURI: string) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

  //METODOS DE FULL SCREEN
  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])

  fullscreenmodes(event: any) {
    this.chkScreenMode();
  }
  chkScreenMode() {
    if (document.fullscreenElement) {
      //fullscreen
      this.isFullScreen = true;
      this.onResize('')
    } else {
      //not in full screen
      this.isFullScreen = false;
      if (this.flagScreen != 0) {
        this.onResize('')
      }

    }
  }
  openFullscreen() {
    this.flagScreen = 1
    if (this.elem?.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem?.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem?.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem?.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }
  /* Close fullscreen */
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }
  //OTROS
  openSnackBar() {
    this._snackBar.open('Porfavor, realize un trazo', 'Ok', {
      duration: 2000,
    });
  }
  //ANIMACION
  toggleAnimation() {
    this.estadoAnimacion = !this.estadoAnimacion
  }

}
