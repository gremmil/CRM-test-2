
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//modelo
//import { LoginInterface } from '../../models/modulos/loginInterface';
import { TipoDocumento, TipoDocumentoApi } from '../../models/modelMaestros/tipoDocumento';
import { LoginService } from '../svcGeneral/login.service';
import { Apimodel } from 'src/app/models/modelGeneral/apimodel';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  params = environment.Headers;
  baseURLList = environment.Maestros.TiposDocumentos;

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
          const resultado: TipoDocumentoApi[] = data.Resultado
          const resultadoConvertido: TipoDocumento[] = resultado.map(item => 
            Apimodel.convertirRespuestaSolicitudApi(item, 'tipodocumento', 'respuesta'))
  
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
