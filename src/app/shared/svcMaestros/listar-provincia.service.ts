import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../svcGeneral/login.service';
import { Provincia, ProvinciaApi } from 'src/app/models';
import { Apimodel } from 'src/app/models/modelGeneral/apimodel';

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListarProvinciaService {

  params = environment.Headers;
  baseURLList = environment.Maestros.ListarProvincia;

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
            const resultado: ProvinciaApi[] = data.Resultado
            const resultadoConvertido: Provincia[] = resultado.map(item => 
              Apimodel.convertirRespuestaSolicitudApi(item, 'provincia', 'respuesta'))
  
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
