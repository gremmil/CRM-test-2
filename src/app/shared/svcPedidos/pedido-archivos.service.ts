import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { PedidoArchivo } from 'SRC/app/models/modelReporteVentas/pedidoArchivos';

@Injectable({
  providedIn: 'root'
})
export class PedidoArchivosService {
  archivosEliminados: Object[]=[]
  archivosAgregados: Object[]=[]

  constructor(
    private formBuilder: FormBuilder
  ) { }
  //FORMULARIO
  form = this.formBuilder.array([]);

  agregarArchivo(archivo: PedidoArchivo){
    let urlArchivoEdicion: string | number | ArrayBuffer
    if(archivo.idPedidoArchivo!=0){
      urlArchivoEdicion = archivo.urlArchivo
    }else{
      urlArchivoEdicion = archivo.urlArchivoBlob
    }
    const archivoFormGroup = this.formBuilder.group({
      idPedidoArchivo: [0],
      urlArchivo: [archivo.urlArchivo, Validators.required],
      nombreArchivo: [archivo.nombreArchivo, Validators.required],
      urlArchivoBlob: [urlArchivoEdicion],
      progreso: [0],
      tipoArchivo: archivo.tipoArchivo
    })
    this.form.push(archivoFormGroup); 
  }
  removerArchivo(indice: number){
    this.form.removeAt(indice);
  }

  //CAMPOS_FORM
  camposForm = [
    { tipo: 'hidden', clave: 'idPedidoImagen', titulo: '', validacion: true },
    { tipo: 'text', clave: 'idPedido', titulo: '', validacion: true },
    { tipo: 'text', clave: 'urlArchivo', titulo: '', validacion: true },
    { tipo: 'text', clave: 'fechaCreacion', titulo: '', validacion: true },
    { tipo: 'text', clave: 'estado', titulo: '', validacion: true }
  ]
}
