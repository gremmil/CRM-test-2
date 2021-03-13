import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../svcGeneral/login.service';
import { map } from 'rxjs/operators';
import { Operador, OperadorApi } from 'src/app/models';
import { Apimodel } from 'src/app/models/modelGeneral/apimodel';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListarOperadorService {

  params = environment.Headers;
  baseURLList = environment.Maestros.ListarOperador;

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
            const resultado: OperadorApi[] = data.Resultado
            const resultadoConvertido: Operador[] = resultado.map(item => 
              Apimodel.convertirRespuestaSolicitudApi(item, 'operador', 'respuesta'))
  
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
