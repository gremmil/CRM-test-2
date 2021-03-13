import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, ValidationErrors } from '@angular/forms';
import { PedidoArchivosService } from './pedido-archivos.service';
import { PedidoProductosService } from './pedido-productos.service';
import { LoginService } from '../svcGeneral/login.service';


import { PedidoCabeceraService } from './pedido-cabecera.service';
import { PedidoCostesService } from './pedido-costes.service';
//MODELOS
import { PedidoCabeceraFormato1, PedidoCabeceraFormato1Api } from '../../models/modelReporteVentas/pedido-cabecera-formato-1'
import { 
  Pedido, PedidoApi,
  PedidoListado, PedidoListadoApi,
  PedidoArchivo, PedidoArchivoApi,
  PedidoCabeceraApi,
  PedidoCoste, PedidoCosteApi,
  PedidoProducto, PedidoProductoApi,
  PedidoToken, PedidoTokenApi,
  NotificacionCrud, NotificacionCrudApi, PedidoCabecera 
} from 'src/app/models';
import { Apimodel } from 'src/app/models/modelGeneral/apimodel';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PedidoService {
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private svcPedidoCabecera: PedidoCabeceraService,
    private svcPedidoArchivos: PedidoArchivosService,
    private svcPedidoProductos: PedidoProductosService,
    private svcPedidoCostes: PedidoCostesService,
    private svcLogin: LoginService
  ) { }

  params = environment.Headers;
  baseURLList = environment.Pedidos.list;
  baseURLCreate = environment.Pedidos.create;
  baseURLDelete = environment.Pedidos.delete;
  baseURLGet = environment.Pedidos.get;
  baseURLGetPorToken = environment.Pedidos.getPorToken;
  baseURLActualizarFirmaPedido = environment.Pedidos.actualizarUrlFirmaDigital;


  //FORMULARIO GENERAL
  formGeneral = this.formBuilder.group({
    pedidoCabecera: this.svcPedidoCabecera.form,
    pedidoArchivos: this.svcPedidoArchivos.form,
    pedidoProductosLineaMovil: this.svcPedidoProductos.frmProdLineaMovil,
    pedidoProductosFibra: this.svcPedidoProductos.frmProdFibra,
    pedidoProductosTvMovil: this.svcPedidoProductos.frmProdTvMovil,
    pedidoCostes: this.svcPedidoCostes.form
  }, { validators: validarLongitudFormulario })

  //FORMULARIO PEDIDO LISTADO FILTROS
  formFiltros = this.formBuilder.group({
    nroDocumento: '',
    estado: '',
    callCenter: '',
    campana: '',
    flagPedidoFirmado: '',
    flagPedidoAtipico: ''
  })

  pedidoCabecera = this.formGeneral.get('pedidoCabecera') as FormGroup;
  pedidoArchivos = this.formGeneral.get('pedidoArchivos') as FormArray;
  pedidoProductosLineaMovil = this.formGeneral.get('pedidoProductosLineaMovil') as FormArray;
  pedidoProductosFibra = this.formGeneral.get('pedidoProductosFibra') as FormArray;
  pedidoProductosTvMovil = this.formGeneral.get('pedidoProductosTvMovil') as FormArray;
  pedidoCostes = this.formGeneral.get('pedidoCostes') as FormGroup;

  limpiarFormularioGeneral() {
    this.svcPedidoCabecera.limpiarFormulario()
    this.svcPedidoCostes.limpiarFormulario()
    this.pedidoArchivos.controls.splice(0, this.pedidoArchivos.length);

    this.pedidoProductosLineaMovil.controls.splice(0, this.pedidoProductosLineaMovil.length);
    this.pedidoProductosFibra.controls.splice(0, this.pedidoProductosFibra.length);
    this.pedidoProductosTvMovil.controls.splice(0, this.pedidoProductosTvMovil.length);
  }

  /************METODOS API****************/
  crearRegistro(): Observable<Apimodel> {
    let archivosSolicitud: PedidoArchivoApi[] = []
    let productosSolicitud: PedidoProductoApi[] = []
    //LINEAS MOVILES
    if (this.pedidoProductosLineaMovil.value.length != 0) {
      this.pedidoProductosLineaMovil.controls.forEach(element => {
        let plantilla = this.formBuilder.group(new PedidoProducto())
        plantilla.patchValue(element.value)
        let plantillaConvertida = Apimodel.convertirRespuestaSolicitudApi(plantilla.value, 'pedidoproducto', 'solicitud')
        productosSolicitud.push(plantillaConvertida)
      });
    }
    //FIBRA OPTICA
    if (this.pedidoProductosFibra.value.length != 0) {
      this.pedidoProductosFibra.controls.forEach(element => {
        let plantilla = this.formBuilder.group(new PedidoProducto())
        plantilla.patchValue(element.value)
        let plantillaConvertida = Apimodel.convertirRespuestaSolicitudApi(plantilla.value, 'pedidoproducto', 'solicitud')
        productosSolicitud.push(plantillaConvertida)
      });
    }
    //TV MOVIL
    if (this.pedidoProductosTvMovil.value.length != 0) {
      this.pedidoProductosTvMovil.controls.forEach(element => {
        let plantilla = this.formBuilder.group(new PedidoProducto())
        plantilla.patchValue(element.value)
        let plantillaConvertida = Apimodel.convertirRespuestaSolicitudApi(plantilla.value, 'pedidoproducto', 'solicitud')
        productosSolicitud.push(plantillaConvertida)
      });
    }
    //ARCHIVOS
    this.pedidoArchivos.controls.forEach((element) => {
      element.get('progreso')?.disable()
      if(element.get('idPedidoArchivo')?.value==0){
        element.get('urlArchivo')?.patchValue(element.get('urlArchivoBlob')?.value)
      }
      element.get('urlArchivoBlob')?.disable()

      let plantillaConvertida = 
      Apimodel.convertirRespuestaSolicitudApi(element.value, 'pedidoarchivo', 'solicitud')
      archivosSolicitud.push(plantillaConvertida)
    })

    let pedidoCabeceraSolicitud : PedidoCabeceraFormato1Api
    let plantillaConvertidaCabecera: PedidoCabeceraFormato1
  
    this.svcPedidoCabecera.form.get('codUsuario').patchValue(this.svcLogin.getToken('login').codUsuario)
    if(this.svcPedidoCabecera.form.value.flagPedidoAtipico==1){
      let plantilla = this.formBuilder.group(new PedidoCabeceraFormato1())
      plantilla.patchValue(this.svcPedidoCabecera.form.value)
      plantillaConvertidaCabecera = plantilla.value
    }else{
      plantillaConvertidaCabecera = this.svcPedidoCabecera.form.value
    }

    pedidoCabeceraSolicitud = 
      Apimodel.convertirRespuestaSolicitudApi(plantillaConvertidaCabecera, 'pedidocabecera', 'solicitud')
    
    let pedidoCostesSolicitud : PedidoCosteApi
    let plantillaConvertidaCostes: PedidoCoste

    if(this.svcPedidoCabecera.form.value.flagPedidoAtipico==1){
      let plantilla = this.formBuilder.group(new PedidoCoste())
      plantilla.patchValue(this.svcPedidoCostes.form.value)
      plantillaConvertidaCostes = plantilla.value
    }else{
      plantillaConvertidaCostes = this.svcPedidoCostes.form.value
    }
    pedidoCostesSolicitud =
    Apimodel.convertirRespuestaSolicitudApi(plantillaConvertidaCostes, 'pedidocoste', 'solicitud')
    
    const solicitudConvertida = JSON.stringify({
      pedido: [pedidoCabeceraSolicitud],//group
      pedidoImagen: archivosSolicitud,//array
      pedidoProducto: productosSolicitud,//array
      pedidoCoste: [pedidoCostesSolicitud]//group
    })
    return this.http.post<Apimodel>(this.baseURLCreate, solicitudConvertida, this.params)
      .pipe(
        map(data => {
          if(data.Error=="200"){
            const resultado: NotificacionCrudApi[] = data.Resultado
            const resultadoConvertido: NotificacionCrud[] = resultado.map(item => 
              Apimodel.convertirRespuestaSolicitudApi(item, 'notificacioncrud', 'respuesta'))
  
            const resConvertido: Apimodel = {
              Error: data.Error,
              Mensaje: data.Mensaje,
              Resultado: resultadoConvertido
            }
            return resConvertido
          }else{
            return data
          }
          
        }
        ))
  }

  /*editarRegistro(): Observable<{}> {
    const request = {
      pedido: this.svcPedidoCabecera.form.value,
      pedidoImagen: this.svcPedidoArchivos.form.value,
      pedidoProductos: this.svcPedidoProductos.form.value
    }
    return this.http.post(this.baseURLCreate, request, this.params);
  }*/
  listarRegistros(): Observable<Apimodel> {
    let login = JSON.stringify({
      idTipoUsuario: this.svcLogin.getToken('login')?.idTipoUsuario,
      codUsuario: this.svcLogin.getToken('login')?.codUsuario
    })
    return this.http.post<Apimodel>(this.baseURLList, login, this.params)
      .pipe(
        map(data => {
          if(data.Error="200"){
            const resultado: PedidoListadoApi[] = data.Resultado
            const resultadoConvertido: PedidoListado[] = resultado.map(item => Apimodel.convertirRespuestaSolicitudApi(item, 'pedidolistado', 'respuesta'))
  
            const resConvertido: Apimodel = {
              Error: data.Error,
              Mensaje: data.Mensaje,
              Resultado: resultadoConvertido
            }
            return resConvertido
          }else{
            return data
          }
         
        }

        ))

  }
  obtenerPedido(id: number): Observable<Apimodel> {

    const request = JSON.stringify({
      idPedido: id,
      codUsuario: this.svcLogin.getToken('login').codUsuario
    })
    return this.http.post<Apimodel>(this.baseURLGet, request, this.params)
      .pipe(
        map(data => {
          if(data.Error=="200"){
            const resultado: PedidoApi = data.Resultado
            let resultadoConvertido: Pedido = 
              Apimodel.convertirRespuestaSolicitudApi(resultado, 'pedido', 'respuesta')
  
              const pedidoCabecera: PedidoCabeceraFormato1[] = resultadoConvertido.pedidoCabecera.map(item => 
              Apimodel.convertirRespuestaSolicitudApi(item, 'pedidocabecera', 'respuesta'))
            
              const pedidoArchivos: PedidoArchivo[] = resultadoConvertido.pedidoArchivos.map(item => 
              Apimodel.convertirRespuestaSolicitudApi(item, 'pedidoarchivo', 'respuesta'))
            
              const pedidoProductos: PedidoProducto[] = resultadoConvertido.pedidoProductos.map(item => 
              Apimodel.convertirRespuestaSolicitudApi(item, 'pedidoproducto', 'respuesta'))
            
              const pedidoCostes: PedidoCoste[] = resultadoConvertido.pedidoCostes.map(item => 
              Apimodel.convertirRespuestaSolicitudApi(item, 'pedidocoste', 'respuesta'))
  
  
            resultadoConvertido = {
              pedidoCabecera: pedidoCabecera,
              pedidoArchivos: pedidoArchivos,
              pedidoProductos: pedidoProductos,
              pedidoCostes: pedidoCostes
            }
            const resConvertido: Apimodel = {
              Error: data.Error,
              Mensaje: data.Mensaje,
              Resultado: resultadoConvertido
            }
            return resConvertido
          }else{
            return data
          }
         
        }

        ))
  }
  obtenerPedidoPorToken(token: string): Observable<Apimodel> {
    const request = JSON.stringify({
      tokenUrlFirma: token,
    })
    return this.http.post<Apimodel>(this.baseURLGetPorToken, request, this.params)
      .pipe(
        map(data => {
          if(data.Error=="200"){
            const resultado: PedidoTokenApi[] = data.Resultado
            const resultadoConvertido: PedidoToken[] = resultado.map(item =>
            Apimodel.convertirRespuestaSolicitudApi(item, 'pedidotoken', 'respuesta'))
  
            const resConvertido: Apimodel = {
              Error: data.Error,
              Mensaje: data.Mensaje,
              Resultado: resultadoConvertido
            }
            return resConvertido
          }else{
            return data
          }
          
        }

        ))
  }
  eliminarPedido(id: number): Observable<Apimodel> {
    const request = JSON.stringify({
      idPedido: id,
      codUsuario: this.svcLogin.getToken('login').codUsuario
    })
    return this.http.post<Apimodel>(this.baseURLDelete, request, this.params)
      .pipe(
        map(data => {
          if(data.Error=="200"){
            const resultado: NotificacionCrudApi[] = data.Resultado
            const resultadoConvertido: NotificacionCrud[] = resultado.map(item => 
              Apimodel.convertirRespuestaSolicitudApi(item, 'notificacioncrud', 'respuesta'))
  
            const resConvertido: Apimodel = {
              Error: data.Error,
              Mensaje: data.Mensaje,
              Resultado: resultadoConvertido
            }
            return resConvertido
          }else{
            return data
          }
          
        }

        ))
  }
  actualizarFirmaPedido(id: number, url: string): Observable<Apimodel> {
    const request = JSON.stringify({
      idPedido: id,
      urlImagenFirma: url
    })
    return this.http.post<Apimodel>(this.baseURLActualizarFirmaPedido, request, this.params)
      .pipe(
        map(data => {
          if(data.Error=="200"){
            const resultado: NotificacionCrudApi[] = data.Resultado
            const resultadoConvertido: NotificacionCrud[] = resultado.map(item => 
              Apimodel.convertirRespuestaSolicitudApi(item, 'notificacioncrud', 'respuesta'))
  
            const resConvertido: Apimodel = {
              Error: data.Error,
              Mensaje: data.Mensaje,
              Resultado: resultadoConvertido
            }
            return resConvertido
          }else{
            return data
          }  
        }))
  }
}
/*function validateSize2(arr: any) {
  return arr.length < 1 ? {
    invalidSize: true
  } : null;
}*/
function validarLongitudFormulario(control: FormGroup): ValidationErrors | null {
  const pedidoProducto = control.get('pedidoProductosLineaMovil') as FormArray;
  const pedidoProductoFibra = control.get('pedidoProductosFibra') as FormArray;
  return pedidoProducto.length + pedidoProductoFibra.length < 1 ? { invalidSize: true } : null;
}