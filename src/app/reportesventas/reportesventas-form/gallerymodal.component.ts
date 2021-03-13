import { Component, OnInit, ChangeDetectorRef, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PedidoService } from 'src/app/shared/svcPedidos/pedido.service';
import { PedidoArchivosService } from 'src/app/shared/svcPedidos/pedido-archivos.service';

@Component({
  selector: 'app-gallerymodal',
  templateUrl: './gallerymodal.component.html',
  styleUrls: ['./gallerymodal.component.css']
})
export class GallerymodalComponent implements OnInit {

  archivoSeleccionado!: any;
  subscription!: Subscription;

  indexSeleccionado!: number;
  imagenesEliminadas: string[]=[];

  constructor(
    public svcPedido: PedidoService,
    public svcPedidoArchivos: PedidoArchivosService,
    private dialogRef: MatDialogRef<GallerymodalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any

  ) {
    this.indexSeleccionado = data.indexSeleccionado
  }

  ngOnInit(): void {
    this.archivoSeleccionado = this.svcPedido.pedidoArchivos.controls[this.indexSeleccionado].value
  }
  cambioArchivoAnterior() {
    this.indexSeleccionado--
    this.archivoSeleccionado = this.svcPedido.pedidoArchivos.controls[this.indexSeleccionado].value
  }
  cambioArchivoPosterior() {
    this.indexSeleccionado++
    this.archivoSeleccionado = this.svcPedido.pedidoArchivos.controls[this.indexSeleccionado].value
  }
  /*eliminarImagen(index: number) {
    let ultimoIndex = this.svcPedidoArchivos.pedidoImagen.value.length - 1
    this.onDeleteClick(index)
    if (ultimoIndex == 0) {
      this.onClose()
    } else {
      switch (index) {
        case 0:
          this.indexSeleccionado++
          this.cambioImagenAnterior()
          break;
        case ultimoIndex:
          this.cambioImagenAnterior()
          break;
        default:
          this.indexSeleccionado--
          this.cambioImagenPosterior()
      }
    }

  }
  onDeleteClick(index: number) {
    let filename = this.svcPedidoArchivos.pedidoImagen.controls[index].value.nombreArchivo
    this.imagenesEliminadas.push(filename)
    this.svcPedidoArchivos.removerImagen(index)
  }*/
  onClose() {
    this.dialogRef.close();
  }

  onDownloadClick(): void {
      const a = document.createElement('a');
      a.href = this.archivoSeleccionado.urlArchivo;
      a.download = this.archivoSeleccionado.nombreArchivo;
      document.body.appendChild(a);
      a.click();
  } 
}
