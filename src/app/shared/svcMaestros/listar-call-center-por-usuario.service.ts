import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { 
  CallcenterPorUsuario, 
  CallcenterPorUsuarioApi
 } from 'src/app/models';
 import { Apimodel } from 'src/app/models/modelGeneral/apimodel';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../svcGeneral/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListarCallCenterPorUsuarioService {
  params = environment.Headers;
  baseURLList = environment.Maestros.ListarCallCenterPorUsuario;

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
            const resultado: CallcenterPorUsuarioApi[] = data.Resultado
            const resultadoConvertido: CallcenterPorUsuario[] = resultado.map(item => 
              Apimodel.convertirRespuestaSolicitudApi(item, 'callcenterporusuario', 'respuesta'))
  
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
