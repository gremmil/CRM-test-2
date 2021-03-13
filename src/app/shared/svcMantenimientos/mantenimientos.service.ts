import { ComponentRef, Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { CallcentersService } from './callcenters.service';
import { CampanasService } from './campanas.service';
import { PlanesService } from './planes.service';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class MantenimientosService {

  componenteActual!: string | null

  displayedColumns!: string[] | undefined
  columnas!: Object[] | undefined
  serviceRef!: ComponentRef<any>

  private enviarComponenteActualSubject = new Subject<string | null>()
  enviarComponenteActualObservable = this.enviarComponenteActualSubject.asObservable()

  constructor(
    private svcCallCenter: CallcentersService,
    private svcCampanas: CampanasService,
    private svcPlanes: PlanesService,
    private svcUsuarios: UsuariosService,
    private formBuilder: FormBuilder

  ) { }

  componentes = {
    callcenters: {
      columnasMostradas:['idCallCenter', 'descripcion', 'estado', 'acciones'],
      columnasDefinicion: [
        {titulo:'N°', definicion:'idCallCenter'},
        {titulo:'Descripcion', definicion:'descripcion'},
        {titulo:'Estado', definicion:'estado'}
      ]
    },
    campanas:{
      columnasMostradas:['idCampana', 'descripcion', 'archivosAdjuntos', 'estado', 'acciones'],
      columnasDefinicion: [
        {titulo:'N°', definicion:'idCampana'},
        {titulo:'Descripcion', definicion:'descripcion'},
        {titulo:'Archivos', definicion:'archivosAdjuntos'},
        {titulo:'Estado', definicion:'estado'}
      ]
    },
    planes:{
      columnasMostradas:['idPlan', 'plan', 'campana', 'tipoProducto', 'estado', 'acciones'],
      columnasDefinicion: [
        {titulo:'N°', definicion:'idPlan'},
        {titulo:'Plan', definicion:'plan'},
        {titulo:'Campañas', definicion:'campana'},
        {titulo:'TiposProducto', definicion:'tipoProducto'},
        {titulo:'Estado', definicion:'estado'}
      ]
    },
    usuarios:{
      columnasMostradas:['idUsuario', 'nombre', 'apellido', 'callCenter', 'tipoUsuario', 'usuario', 'contrasena', 'estado', 'acciones'],
      columnasDefinicion: [
        {titulo:'N°', definicion:'idUsuario'},
        {titulo:'Nombre', definicion:'nombre'},
        {titulo:'Apellido', definicion:'apellido'},
        {titulo:'CallCenter', definicion:'callCenter'},
        {titulo:'Tipo Usuario', definicion:'tipoUsuario'},
        {titulo:'Usuario', definicion:'usuario'},
        {titulo:'Contraseña', definicion:'contrasena'},
        {titulo:'Estado', definicion:'estado'}
      ]
    }
  }

  enviarComponenteActual(componente: string | null){
    this.componenteActual = componente
    this.enviarComponenteActualSubject.next(componente)
  }
  obtenerDatosComponenteActual(){
    switch(this.componenteActual){
      case 'callcenters':
        return this.componentes['callcenters']
      break;
      case 'campanas':
        return this.componentes['campanas']
      break;
      case 'planes':
        return this.componentes['planes']
      break;
      case 'usuarios':
        return this.componentes['usuarios']
      break;
      default:
    }  
  }
   /************METODOS****************/
    obtenerCRUD(){
     switch(this.componenteActual){
      case 'callcenters':
        return this.svcCallCenter
      case 'campanas':
        return this.svcCampanas
      case 'planes':
        return this.svcPlanes
      case 'usuarios':
        return this.svcUsuarios
      default:
    }  
   }
   obtenerCamposForm(){
    switch(this.componenteActual){
     case 'callcenters':
       return [
        { tipo: 'hidden', clave: 'idCallCenter', titulo: 'Id', validacion: true, cols: 'col-12 col-sm-6' },
        { tipo: 'text', clave: 'descripcion', titulo: 'Descripcion', validacion: true, cols: 'col-12 col-sm-6' },
        { tipo: 'switch', clave: 'estado', titulo: 'Activar', validacion: true, cols: 'col-12 col-sm-6' },
      ]
     case 'campanas':
       return [
        {tipo: 'hidden', clave: 'idCampana', titulo: 'Id', validacion: true, cols: 'col-12 col-sm-6'},
        {tipo: 'text', clave: 'descripcion', titulo: 'Descripcion', validacion: true, cols: 'col-12 col-sm-6'},
        {tipo: 'textarea', clave: 'archivosAdjuntos', titulo: 'ArchivosAdjuntos', validacion: true, cols: 'col-12 col-sm-6'},
        {tipo: 'hidden', clave: 'contenedor', titulo: 'contenedor', validacion: true, cols: 'col-12 col-sm-6'},
        {tipo: 'switch', clave: 'estado', titulo: 'Activar', validacion: true, cols: 'col-12 col-sm-6'},
      ]
     case 'planes':
       return [
        {tipo: 'hidden', clave: 'idPlan', titulo: 'Id', validacion: true, cols: 'col-12 col-sm-6'},
        {tipo: 'text', clave: 'plan', titulo: 'Descripcion', validacion: true, cols: 'col-12 col-sm-6'},
        {tipo: 'select', clave: 'idCampana', titulo: 'Campaña', validacion: true, cols: 'col-12 col-sm-6'},
        {tipo: 'hidden', clave: 'campana', titulo: 'Campaña', validacion: true, cols: 'col-12 col-sm-6'},
        {tipo: 'select', clave: 'idTipoProducto', titulo: 'Tipos Productos', validacion: true, cols: 'col-12 col-sm-6'},
        {tipo: 'hidden', clave: 'tipoProducto', titulo: 'Tipos Productos', validacion: true, cols: 'col-12 col-sm-6'},
        {tipo: 'switch', clave: 'estado', titulo: 'Activar', validacion: true, cols: 'col-12 col-sm-6'}
      ]
     case 'usuarios':
       return [
        {tipo: 'hidden', clave: 'idUsuario', titulo: 'Id', validacion: true, cols: 'col-12 col-sm-6'},
        {tipo: 'text', clave: 'nombre', titulo: 'Nombre', validacion: true, cols: 'col-12 col-sm-6'},
        {tipo: 'text', clave: 'apellido', titulo: 'Apellido', validacion: true, cols: 'col-12 col-sm-6'},
        {tipo: 'select', clave: 'idTipoUsuario', titulo: 'TipoUsuario', validacion: true, cols: 'col-12 col-sm-6'},
        {tipo: 'hidden', clave: 'tipoUsuario', titulo: 'TipoUsuario', validacion: true, cols: 'col-12 col-sm-6'},
        {tipo: 'select', clave: 'idCallCenter', titulo: 'CallCenter', validacion: true, cols: 'col-12 col-sm-6', oculto: false},
        {tipo: 'hidden', clave: 'callCenter', titulo: 'CallCenter', validacion: true, cols: 'col-12 col-sm-6'},
        {tipo: 'text', clave: 'usuario', titulo: 'Usuario', validacion: true, cols: 'col-12 col-sm-6'},
        {tipo: 'text', clave: 'contrasena', titulo: 'Contraseña', validacion: true, cols: 'col-12 col-sm-6'},
        {tipo: 'switch', clave: 'estado', titulo: 'Activar', validacion: true, cols: 'col-12 col-sm-6'}
      ]
     default:
   }  
  }
  //FORMULARIO PEDIDO LISTADO FILTROS
  formFiltros = this.formBuilder.group({
    NroDocumento: '',
    Estado: '',
    CallCenter: '',
    Campana: '',
    EstadoFirma: ''
  })
}

