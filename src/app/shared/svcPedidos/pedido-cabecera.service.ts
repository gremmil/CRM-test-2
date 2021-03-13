import { Injectable } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { PedidoCabeceraFormato1, Campana } from 'src/app/models';
import { Subject } from 'rxjs';
import { LoginService } from '../svcGeneral/login.service';


@Injectable({
  providedIn: 'root'
})
export class PedidoCabeceraService {

  campanasFiltro!: Campana[]

  private enviarcampanasFiltroSubject = new Subject<Campana[]>()
  enviarcampanasFiltroObservable = this.enviarcampanasFiltroSubject.asObservable()

  constructor(
    private formBuilder: FormBuilder,
    private svcLogin: LoginService
  ) { }

  form = this.formBuilder.group({
    idPedido: [0, [Validators.required]],
    idCampana: [0, [Validators.required]],
    nombres: ['', [Validators.required, Validators.maxLength(200)]],
    apellidos: ['', [Validators.required, Validators.maxLength(200)]],

    idTipoDocumento: [0, [Validators.required]],
    nroDocumento: ['', [Validators.required, Validators.maxLength(9)]],
    fechaNacimiento: [, [Validators.required]],
    idProvincia: [0, [Validators.required]],

    localidad: ['', [Validators.required, Validators.maxLength(200)]], 
    nombreVia: ['', [Validators.required, Validators.maxLength(200)]],
    numero: ['', [Validators.required, Validators.maxLength(10)]],
    planta: ['', [Validators.required, Validators.maxLength(10)]],

    puerta: ['', [Validators.required, Validators.maxLength(10)]],
    escalera: ['', [Validators.maxLength(10)]],
    codPostal: ['', [Validators.required, Validators.maxLength(5)]],
    contactoMovil: ['', [Validators.required, Validators.maxLength(10)]],
    contactoOtro: [''],

    correo: ['', [Validators.email]],
    cuentaBancaria: ['', [Validators.required, Validators.maxLength(30)]],
    idEstadoPedido: [0],
    codUsuario: [this.svcLogin.getToken('login')?.codUsuario],
    idCallCenter: [0, [Validators.required]],
    flagPedidoAtipico: [0, [Validators.required]]
  })

  limpiarFormulario(): void {
    this.form.reset()
    this.form.setValue( new PedidoCabeceraFormato1())
    this.form.patchValue({codUsuario: this.svcLogin.getToken('login')?.codUsuario})
  }
  establecerValorDelFormulario(item: PedidoCabeceraFormato1){
    this.form.patchValue(item)
  }
  enviarCampanaFiltro(campana: Campana[]){
    this.enviarcampanasFiltroSubject.next(campana)
    this.campanasFiltro = campana
  }
  deshabilitarCampos(){
    this.camposForm.forEach((campo, i)=>{
      if(i>6){
        this.form.get(campo.clave).disable()
      }
    })
  }
  habilitarCampos(){
    this.camposForm.forEach((campo, i)=>{
      if(i>5){
        this.form.get(campo.clave).enable()
      }
    })
  }

    //CAMPOS_FORM
    camposForm= [
      { cols: '', rows: '1', tipo: 'hidden', clave: 'idPedido', titulo: 'IdPedido', validacion: false },
      { cols: '', rows: '1', tipo: 'hidden', clave: 'idCampana', titulo: 'Campaña', validacion: false },
      { cols: 'col-12 col-sm-6 col-md-3', rows: '1', tipo: 'text', clave: 'nombres', titulo: 'Nombres', validacion: {
        required: true,
        minlength: false,
        maxlength: true
      } },
      { cols: 'col-12 col-sm-6 col-md-3', rows: '1', tipo: 'text', clave: 'apellidos', titulo: 'Apellidos', validacion: {
        required: true,
        minlength: false,
        maxlength: true
      } },
  
      { cols: 'col-12 col-sm-6 col-md-3', rows: '1', tipo: 'select', clave: 'idTipoDocumento', titulo: 'Documento', validacion: {
        required: true,
        minlength: false,
        maxlength: false
      } },
      { cols: 'col-12 col-sm-6 col-md-3', rows: '1', tipo: 'text', clave: 'nroDocumento', titulo: 'Nro', validacion: {
        required: true,
        minlength: false,
        maxlength: true
      } },
      { cols: 'col-12 col-sm-6 col-md-3', rows: '1', tipo: 'date', clave: 'fechaNacimiento', titulo: 'Fecha Nacimiento', validacion: {
        required: true,
        minlength: false,
        maxlength: false
      } },
      { cols: 'col-12 col-sm-6 col-md-3', rows: '1', tipo: 'select', clave: 'idProvincia', titulo: 'Provincia', validacion: {
        required: true,
        minlength: false,
        maxlength: false
      } },
  
      { cols: 'col-12 col-sm-6 col-md-3', rows: '1', tipo: 'text', clave: 'localidad', titulo: 'Localidad', validacion: {
        required: true,
        minlength: false,
        maxlength: true
      } },
      { cols: 'col-12 col-sm-6 col-md-3', rows: '1', tipo: 'text', clave: 'nombreVia', titulo: 'Nombre de Vía', validacion: {
        required: true,
        minlength: false,
        maxlength: true
      } },
      { cols: 'col-4 col-sm-3 col-md-2', rows: '1', tipo: 'text', clave: 'numero', titulo: 'Número', validacion: {
        required: true,
        minlength: false,
        maxlength: true
      } },
      { cols: 'col-4 col-sm-3 col-md-2', rows: '1', tipo: 'text', clave: 'planta', titulo: 'Planta', validacion: {
        required: true,
        minlength: false,
        maxlength: true
      } },
  
      { cols: 'col-4 col-sm-3 col-md-2', rows: '1', tipo: 'text', clave: 'puerta', titulo: 'Puerta', validacion: {
        required: true,
        minlength: false,
        maxlength: true
      } },
      { cols: 'col-4 col-sm-3 col-md-2', rows: '1', tipo: 'text', clave: 'escalera', titulo: 'Escalera', validacion: {
        required: true,
        minlength: false,
        maxlength: true
      } },
      { cols: 'col-4 col-sm-3 col-md-2', rows: '1', tipo: 'text', clave: 'codPostal', titulo: 'Postal', validacion: {
        required: true,
        minlength: false,
        maxlength: true
      } },
      { cols: 'col-12 col-sm-6 col-md-3', rows: '1', tipo: 'text', clave: 'contactoMovil', titulo: 'Contacto Móvil', validacion: {
        required: true,
        minlength: false,
        maxlength: true
      } },
      { cols: 'col-12 col-sm-6 col-md-3', rows: '1', tipo: 'text', clave: 'contactoOtro', titulo: 'Contacto Otro', validacion: false },
  
      { cols: 'col-12 col-sm-6 col-md-3', rows: '1', tipo: 'text', clave: 'correo', titulo: 'Correo', validacion: false },
      { cols: 'col-12 col-sm-6 col-md-3', rows: '1', tipo: 'text', clave: 'cuentaBancaria', titulo: 'Cuenta Bancaria', validacion: {
        required: true,
        minlength: false,
        maxlength: true
      } }
      /*{ cols: '1', rows: '1', tipo: 'hidden', clave: 'idEstadoPedido', titulo: 'idEstadoPedido', validacion: false },
      { cols: '1', rows: '1', tipo: 'hidden', clave: 'codUsuarioCreacion', titulo: 'codUsuarioCreacion', validacion:{
        required: true,
        minlength: false,
        maxlength: true
      } },
      { cols: '1', rows: '1', tipo: 'hidden', clave: 'fechaCreacion', titulo: 'fechaCreacion', validacion: false },
  
      { cols: '1', rows: '1', tipo: 'hidden', clave: 'codUsuarioModificacion', titulo: 'codUsuarioModificacion', validacion:{
        required: true,
        minlength: false,
        maxlength: true
      } },*/
      /*{ cols: '1', rows: '1', tipo: 'hidden', clave: 'fechaModificacion', titulo: 'fechaModificacion', validacion: false }*/
    ]

    camposFormAtipico = [
      { cols: '', rows: '1', tipo: 'hidden', clave: 'idPedido', titulo: 'IdPedido', validacion: false },
      { cols: '', rows: '1', tipo: 'hidden', clave: 'idCampana', titulo: 'Campaña', validacion: false },
      { cols: 'col-12 col-sm-6', rows: '1', tipo: 'text', clave: 'nombres', titulo: 'Nombres', validacion: {
        required: true,
        minlength: false,
        maxlength: true
      } },
      { cols: 'col-12 col-sm-6', rows: '1', tipo: 'text', clave: 'apellidos', titulo: 'Apellidos', validacion: {
        required: true,
        minlength: false,
        maxlength: true
      } },
  
      { cols: 'col-12 col-sm-6', rows: '1', tipo: 'select', clave: 'idTipoDocumento', titulo: 'Documento', validacion: {
        required: true,
        minlength: false,
        maxlength: false
      } },
      { cols: 'col-12 col-sm-6', rows: '1', tipo: 'text', clave: 'nroDocumento', titulo: 'Nro', validacion: {
        required: true,
        minlength: false,
        maxlength: true
      } }
    ]
}
