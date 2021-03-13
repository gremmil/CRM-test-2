import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
//Modelo
import { EstadoPedido, EstadoPedidoApi } from '../../models/modelMaestros/estadoPedido';
import { LoginService } from '../svcGeneral/login.service';
import { Apimodel } from 'src/app/models/modelGeneral/apimodel';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstadoPedidoService {

  params = environment.Headers;
  baseURLList = environment.Maestros.EstadoPedidos;
  constructor(
    private login: LoginService,
    private http: HttpClient
  ) { }

  /************METODOS****************/
  listarRegistros(): Observable<Apimodel> {
    let credencial = JSON.stringify({
      codUsuario: this.login.getToken('login')?.codUsuario
    })
    return this.http.post<Apimodel>(this.baseURLList, credencial, this.params)
      .pipe(
        map(data => {
          if(data.Error=="200"){
            const resultado: EstadoPedidoApi[] = data.Resultado
            const resultadoConvertido: EstadoPedido[] = resultado.map(item => 
              Apimodel.convertirRespuestaSolicitudApi(item, 'estadopedido', 'respuesta'))
  
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

}
