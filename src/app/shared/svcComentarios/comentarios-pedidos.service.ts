import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../svcGeneral/login.service';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { 
  InsertarComentarioPedido, 
  ListarComentariosPedido, 
  ListarComentariosPedidoApi,
  NotificacionCrud,
  NotificacionCrudApi
} from 'src/app/models';
import { Apimodel } from 'src/app/models/modelGeneral/apimodel';

import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComentariosPedidosService {
  params = environment.Headers;
  baseURLList = environment.Comentarios.list;
  baseURLCreate = environment.Comentarios.create;

  filtroPedidos!: any[]
  constructor(
    private http: HttpClient,
    private svcLogin: LoginService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  form = this.formBuilder.group({
    idPedido: [ 0 ,[Validators.required]],
    comentario: [ '' ,[Validators.required]],
    idTipoUsuario: [ this.svcLogin.getToken('login')?.idTipoUsuario ,[Validators.required]],
    codUsuario: [ this.svcLogin.getToken('login')?.codUsuario ,[Validators.required]]
  })

  limpiarFormulario(): void {
    this.form.reset()
    this.form.setValue(new InsertarComentarioPedido());
    this.form.get('idTipoUsuario').patchValue(this.svcLogin.getToken('login')?.idTipoUsuario)
    this.form.get('codUsuario').patchValue(this.svcLogin.getToken('login')?.codUsuario)
  }
  establecerValorDelFormulario(row: InsertarComentarioPedido) {
    this.form.patchValue(new InsertarComentarioPedido(
      row.idPedido, row.comentario, row.idTipoUsuario, row.codUsuario))
  }

  crearRegistro(): Observable<Apimodel> {

    let solicitud = Apimodel.convertirRespuestaSolicitudApi(this.form.value, 'insertarcomentario', 'solicitud')
    return this.http.post<Apimodel>(this.baseURLCreate, solicitud, this.params)
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
  listarRegistros(id: number): Observable<Apimodel> {
    const request = JSON.stringify({
      idPedido: id,
      codUsuario: this.svcLogin.getToken('login')?.codUsuario
    })
    return this.http.post<Apimodel>(this.baseURLList, request, this.params)
      .pipe(
        map(data => {
          const resultado: ListarComentariosPedidoApi[] = data.Resultado
          const resultadoConvertido: ListarComentariosPedido[] = resultado?.map(item => 
            Apimodel.convertirRespuestaSolicitudApi(item, 'listarcomentarios', 'respuesta'))

          const resConvertido: Apimodel = {
            Error: data.Error,
            Mensaje: data.Mensaje,
            Resultado: resultadoConvertido
          }
          return resConvertido
        }

        ))
  }
  closeChat() {
    this.dialog.closeAll()
  }

}
