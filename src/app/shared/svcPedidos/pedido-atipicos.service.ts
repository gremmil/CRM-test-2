import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { NotificacionCrud, NotificacionCrudApi } from "src/app/models";
import { Apimodel } from 'src/app/models/modelGeneral/apimodel';

import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LoginService } from "../svcGeneral/login.service";

@Injectable({
  providedIn: "root",
})
export class PedidoAtipicosService {
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private svcLogin: LoginService
  ) { }

  params = environment.Headers;
  baseURLList = environment.Pedidos.list;
  baseURLCreate = environment.Pedidos.create;
  //baseURLEdit = environment.Pedidos.update;
  baseURLGet = environment.Pedidos.get;

  //FORMULARIO_PEDIDO_CABECERA
  form = this.formBuilder.group({
    idPedido: [0, [Validators.required]],
    idCampana: [0, [Validators.required]],
    nombres: ['', [Validators.required, Validators.maxLength(200)]],
    apellidos: ['', [Validators.required, Validators.maxLength(200)]],

    idTipoDocumento: [0, [Validators.required]],
    nroDocumento: ['', [Validators.required, Validators.maxLength(9)]],

    idPlan: [0, [Validators.required]],
    planesLineasMovil: this.formBuilder.array([]),

    costePromocional: [0, [Validators.required]],
    costeReal: [0, [Validators.required]],

    idEstadoPedido: [0],
    codUsuario: [this.svcLogin.getToken('login')?.codUsuario],
  });

  planesLineasMovil = this.form.get('planesLineasMovil') as FormArray;

  agregarPlanesLineaMovil() {
    let id = 0
    if (this.planesLineasMovil.length == 0) {
      id = 2
    } else {
      id = 3
    }
    const formPlanLineaMovil = this.formBuilder.group({
      planLineaMovil: [0, [Validators.required]],
      idTipoProducto: id
    })
    this.planesLineasMovil.push(formPlanLineaMovil)
  }
  eliminarPlanesLineaMovil(indice: number) {
    this.planesLineasMovil.removeAt(indice);
  }
  limpiarFormularioGeneral() {
    this.form.reset()
    this.form.patchValue({
      idPedido: 0,
      idCampana: 0,
      nombres: '',
      apellidos: '',
      idTipoDocumento: 0,
      nroDocumento: '',
      idPlan: 0,
      costePromocional: 0,
      costeReal: 0,
      idEstadoPedido: 0,
      codUsuario: [this.svcLogin.getToken('login')?.codUsuario],
    })
    this.planesLineasMovil.controls.splice(0, this.planesLineasMovil.length);
  }

  //APIS
  crearRegistro(): Observable<Apimodel> {
    const request = {

    }
    return this.http.post<Apimodel>(this.baseURLCreate, request, this.params)
      .pipe(
        map(data => {
          const resultado: NotificacionCrudApi[] = data.Resultado
          const resultadoConvertido: NotificacionCrud[] = resultado.map(item => Apimodel.convertirRespuestaSolicitudApi(item, 'notificacioncrud', 'respuesta'))

          const resConvertido: Apimodel = {
            Error: data.Error,
            Mensaje: data.Mensaje,
            Resultado: resultadoConvertido
          }
          return resConvertido
        }

        ))
  }
  listarRegistros(): Observable<{}> {
    let login = JSON.stringify({
      idTipoUsuario: this.svcLogin.getToken('login')?.idTipoUsuario,
      codUsuario: this.svcLogin.getToken('login')?.codUsuario
    })
    return this.http.post(this.baseURLList, login, this.params)
  }
  obtenerPedido(id: number): Observable<Apimodel> {
    const request = JSON.stringify({
      idPedido: id,
      codUsuario: this.svcLogin.getToken('login')?.codUsuario
    })
    return this.http.post<Apimodel>(this.baseURLGet, request, this.params)
      .pipe(
        map(data => {
          const resultado: NotificacionCrudApi[] = data.Resultado
          const resultadoConvertido: NotificacionCrud[] = resultado.map(item => 
            Apimodel.convertirRespuestaSolicitudApi(item, 'notificacioncrud', 'respuesta'))

          const resConvertido: Apimodel = {
            Error: data.Error,
            Mensaje: data.Mensaje,
            Resultado: resultadoConvertido
          }
          return resConvertido
        }

        ))
  }

  //CAMPOS_FORM
  camposForm = [

    { cols: '1', rows: '1', tipo: 'hidden', clave: 'idPedido', titulo: 'IdPedido', validacion: false },
    { cols: '1', rows: '1', tipo: 'hidden', clave: 'idCampana', titulo: 'Campaña', validacion: false },
    {
      cols: 'col-sm-6', rows: '1', tipo: 'text', clave: 'nombres', titulo: 'Nombres', validacion: {
        required: true,
        minlength: false,
        maxlength: true
      }
    },
    {
      cols: 'col-sm-6', rows: '1', tipo: 'text', clave: 'apellidos', titulo: 'Apellidos', validacion: {
        required: true,
        minlength: false,
        maxlength: true
      }
    },

    {
      cols: 'col-sm-6', rows: '1', tipo: 'select', clave: 'idTipoDocumento', titulo: 'Documento', validacion: {
        required: true,
        minlength: false,
        maxlength: false
      }
    },
    {
      cols: 'col-sm-6', rows: '1', tipo: 'text', clave: 'nroDocumento', titulo: 'Nro', validacion: {
        required: true,
        minlength: false,
        maxlength: true
      }
    },

    {
      cols: 'col-sm-6', rows: '1', tipo: 'select', clave: 'idPlan', titulo: 'Internet', validacion: {
        required: true,
        minlength: false,
        maxlength: true
      }
    },
    { cols: 'col-sm-6', rows: '1', tipo: 'button', clave: 'cantidadLineasMoviles', titulo: 'Agregar Lineas Moviles' },
    { cols: 'col-sm-12', rows: '1', tipo: 'formArray', clave: 'planLineaMovil', titulo: 'cantidad de Tarjeta SIM', subtitulo: 'Tarjeta SIM' },
    {
      cols: 'col-sm-6', rows: '1', tipo: 'text', clave: 'costePromocional', titulo: 'Coste Promocional', validacion: {
        required: true,
        minlength: false,
        maxlength: true
      }
    },
    {
      cols: 'col-sm-6', rows: '1', tipo: 'text', clave: 'costeReal', titulo: 'Coste Real', validacion: {
        required: true,
        minlength: false,
        maxlength: true
      }
    }

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
  //CAMPOS_FORM
  camposFormPlanLineaMovil = [
    { cols: '1', rows: '1', tipo: 'select', clave: 'planLineaMovil', titulo: 'Tarjeta SIM', validacion: false }
  ]
}

