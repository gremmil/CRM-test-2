import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//modelo
import { LoginService } from '../svcGeneral/login.service';
import { TipoProducto, TipoProductoApi } from 'src/app/models';
import { Apimodel } from 'src/app/models/modelGeneral/apimodel';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {

  params = environment.Headers;
  baseURLList = environment.Maestros.TiposProducto;

  constructor(
    private login: LoginService,
    private http: HttpClient
  ) { }

  /************METODOS****************/
  listarRegistros():  Observable<Apimodel> {
    let credencial = JSON.stringify({
      codUsuario: this.login.getToken('login')?.codUsuario
    })
    return this.http.post<Apimodel>(this.baseURLList, credencial, this.params)
    .pipe(
      map(data => {
        if(data.Error=="200"){
          const resultado: TipoProductoApi[] = data.Resultado
          const resultadoConvertido: TipoProducto[] = resultado.map(item => 
            Apimodel.convertirRespuestaSolicitudApi(item, 'tipoproducto', 'respuesta'))
  
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
