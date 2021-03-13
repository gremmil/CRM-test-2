import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlobSharedViewStateService } from 'src/app/azure-storage/services/blob-shared-view-state.service';
import { BlobUploadsViewStateService } from 'src/app/azure-storage/services/blob-uploads-view-state.service';
import { PedidoArchivo } from 'src/app/models';
import { PedidoArchivosService } from 'src/app/shared/svcPedidos/pedido-archivos.service';
import { PedidoService } from 'src/app/shared/svcPedidos/pedido.service';
import { environment } from 'src/environments/environment';
import { Subscription, timer } from 'rxjs';
import { GallerymodalComponent } from '../gallerymodal.component';
import { PedidoCabeceraService } from 'src/app/shared/svcPedidos/pedido-cabecera.service';

@Component({
  selector: 'app-reportesventas-form-archivos',
  templateUrl: './reportesventas-form-archivos.component.html',
  styleUrls: ['./reportesventas-form-archivos.component.css']
})
export class ReportesventasFormArchivosComponent implements OnInit {

  @ViewChild('fileInput2', { static: false }) fileInput!: ElementRef<
    HTMLInputElement
  >;
  formularioEditado: boolean = false

   //SUSCRIPCIONES
   subidaImagenesSubscription$!: Subscription;
   imgDelay$!: Subscription;
   //FLAGS
  flagBlob!: number;

  constructor(
    public dialog: MatDialog,
    public svcPedido: PedidoService,
    public svcPedidoArchivos: PedidoArchivosService,
    public svcPedidoCabecera: PedidoCabeceraService,
    private blobUpload: BlobUploadsViewStateService,
    private blobShared: BlobSharedViewStateService
  ) { }

  ngOnDestroy(): void {
    this.subidaImagenesSubscription$?.unsubscribe()
    this.imgDelay$?.unsubscribe()
  }
  ngOnInit(): void {
    const delayImg = timer(5000)
    //Inicializamos el contenedor del blob storage
    this.blobShared.getContainerItems('contenedor-sip')
    //this.blobShared.getContainerItems('sgdcontainer')

    //this.blobShared.itemsInContainer$
    //Nos suscribimos a la subida de archivos
    this.subidaImagenesSubscription$ = this.blobUpload.uploadedItems$.subscribe(val => {
      let item = val[val.length - 1]
      if (this.flagBlob == 0) {
        let index = this.svcPedido.pedidoArchivos.value.length - 1
        let esArchivo: number
        let itemfileType = item.filetype?.toLowerCase()
        if (itemfileType == 'jpg' || itemfileType == 'jpeg' || itemfileType == 'png' || itemfileType == 'svg') {
          esArchivo = 1
        } else if (itemfileType == 'mp4' || itemfileType == 'mp3') {
          esArchivo = 2
        } else {
          esArchivo = 3
        }
        this.svcPedidoArchivos.archivosAgregados.push(item.filename)
          this.svcPedido.pedidoArchivos.controls[index].patchValue({
            urlArchivoBlob: environment.urlBlobStorage + item.containerName + '/' + item.filename,
            nombreArchivo: item.filename,
            tipoArchivo: esArchivo
          })
        
        this.flagBlob++
      }
    })
    
  }
  mostrarDialogoArchivo(): void {
    this.fileInput.nativeElement.click();
  }
  //gallery
  abrirGaleria(index: number): void {
    //this.galleryService.selectImage(position);

    const dialogRef = this.dialog.open(GallerymodalComponent, {
      panelClass: 'custom-dialog-container',
      data: { indexSeleccionado: index }
    });
    /*dialogRef.afterClosed().subscribe(value => {
      if (value.length!=0) {
        value.forEach((element:string) => {
          this.imagenesEliminadas.push(element)
        });
      }
    })*/
  }
  eliminarArchivo(index: number): void {
    this.formularioEditado = true
    let nombreArchivo = this.svcPedido.pedidoArchivos.controls[index].value.nombreArchivo
    this.svcPedidoArchivos.archivosEliminados.push(nombreArchivo)
    this.svcPedidoArchivos.removerArchivo(index)
    /*if(this.service.pedido.value.idPedido==0){
      this.blobDelete.deleteItem(filename);
    }*/
  }
  //METODOS_PEDIDO_IMAGEN
  file: any;
  localUrl: any;
  localCompressedURl: any;
  sizeOfOriginalImage!: number;
  sizeOFCompressedImage!: number;

  seleccionarArchivo(event: any) {
    var file: File = event.target.files[0]
    this.formularioEditado = true
    this.flagBlob = 0
    let img: PedidoArchivo = {  
      idPedidoArchivo: 0,
      urlArchivo: '',
      nombreArchivo: '',
      progreso: 0,
      urlArchivoBlob: '',
      tipoArchivo: ''
    }
    this.svcPedidoArchivos.agregarArchivo(img)
    var reader = new FileReader()
    reader.onloadend = (event: Event) => {
      this.svcPedidoArchivos.form.controls[this.svcPedidoArchivos.form.length-1]
      .get('urlArchivo').patchValue(reader.result)
      const blob = this.dataURLToBlob(<string>reader.result);
      const imgFile = new File([blob], file.name, { type: 'application/octet-stream' })
      let list = new DataTransfer()
      list.items.add(imgFile)
      let myFileList = list.files
      this.blobUpload.uploadItems(myFileList);
    }
    reader.readAsDataURL(event.target.files[0]);

    this.fileInput.nativeElement.value = '';

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

}
