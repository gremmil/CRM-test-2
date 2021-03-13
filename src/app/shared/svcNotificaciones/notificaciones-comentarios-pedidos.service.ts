import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LoginService } from '../svcGeneral/login.service';
import { environment } from 'src/environments/environment';
import { 
  ListarNotificacionesComentarioPedido,
  ListarNotificacionesComentarioPedidoApi, 
  NotificacionCantidad, 
  NotificacionComentarioPedido,
  NotificacionCrudApi,
  NotificacionCrud 
} from 'src/app/models';
import { Apimodel } from 'src/app/models/modelGeneral/apimodel';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NotificacionesComentariosPedidosService {

  params = environment.Headers;
  baseURLList = environment.Notificaciones.list;
  baseURLDesactivar = environment.Notificaciones.update;

  //NOTIFICACION -> CHAT
  idPedido!: number
  public enviarIdPedidoSubject = new Subject<number>()
  enviarIdPedidoObservable = this.enviarIdPedidoSubject.asObservable()
  
  constructor(
    private http: HttpClient,
    private svcLogin: LoginService
  ) { }

  listarRegistros():  Observable<Apimodel> {
    const request=JSON.stringify({
      codUsuario: this.svcLogin.getToken('login')?.codUsuario,
      idTipoUsuario: this.svcLogin.getToken('login')?.idTipoUsuario
    })
    return this.http.post<Apimodel>(this.baseURLList, request, this.params)
    .pipe(
      map(data => {
        if(data.Error=="200"){
          const resultado: ListarNotificacionesComentarioPedidoApi = data.Resultado
          let resultadoConvertido: ListarNotificacionesComentarioPedido = 
          Apimodel.convertirRespuestaSolicitudApi(resultado, 'listarnotificaciones', 'respuesta')
  
          const notificacionCantidad: NotificacionCantidad[] = resultadoConvertido.cantidad.map( item => 
            Apimodel.convertirRespuestaSolicitudApi(item, 'notificacioncantidad', 'respuesta'))
          const notificacionComentarioPedido: NotificacionComentarioPedido [] = resultadoConvertido.notificaciones.map(item => 
            Apimodel.convertirRespuestaSolicitudApi(item, 'notificacioncomentario', 'respuesta'))
  
          resultadoConvertido = {
            cantidad: notificacionCantidad,
            notificaciones: notificacionComentarioPedido
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
  desactivarRegistro(id: number):  Observable<Apimodel> {
    const request=JSON.stringify({
      idTipoUsuario: this.svcLogin.getToken('login')?.idTipoUsuario,
      idPedido: id
    })
    return this.http.post<Apimodel>(this.baseURLDesactivar, request, this.params)
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
  enviarIdPedido(idPedido: number){
    this.idPedido = idPedido
    this.enviarIdPedidoSubject.next(idPedido)
  }
}
