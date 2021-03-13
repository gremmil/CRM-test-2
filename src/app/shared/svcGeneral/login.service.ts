import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login, LoginApi, SessionApi } from 'src/app/models';
import { Apimodel } from 'src/app/models/modelGeneral/apimodel';

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Session } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  token!: any;

  params = environment.Headers;
  baseURLValidarLogin = environment.General.validarLogin;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  public urlUsuarioIntentaAcceder=''
  //FORMULARIO
  form = this.formBuilder.group({
    codUsuario: ['', Validators.required],
    contrasena: ['', Validators.required],
  });
  limpiarFormulario(): void {
    this.form.reset()
    this.form.setValue( new Login() )
  }
  setValuesForm(row: Login) {
    this.form.patchValue( new Login(
      row.codUsuario, row.contrasena
    ))
  }

  //APIS
  validarLogin(): Observable<Apimodel> {
    let solicitud = Apimodel.convertirRespuestaSolicitudApi(this.form.value, 'login', 'solicitud')
    return this.http.post<Apimodel>(this.baseURLValidarLogin, solicitud, this.params)
    .pipe(
      map(data => {

        if(data.Error=="200"){
          const resultado: SessionApi[] = data.Resultado
          const resultadoConvertido: Session[] = resultado.map(item => 
            Apimodel.convertirRespuestaSolicitudApi(item, 'session', 'respuesta'))
  
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
  
  //COOKIES SESSION
  setToken(key: string, data: any) {
    try{
      sessionStorage.setItem(key, JSON.stringify(data))
    }catch(error){
      console.log(error)
    }
  }
  getToken(key: string){
    try{
      this.token = sessionStorage.getItem(key)
      return JSON.parse(this.token)
    }catch(error){
      console.log(error)
    }
  }
  destroyToken(key: string){
    try{
      sessionStorage.removeItem(key)
    }catch(error){
      console.log(error)
    }
  }
  clearTokens(){
    try{
      sessionStorage.clear()
    }catch(error){
      console.log(error)
    }
  }

  isLoggedIn(url: string){
    const isLogged = this.getToken('login')?.codUsuario;
    if(isLogged==''||isLogged==undefined){
      this.urlUsuarioIntentaAcceder= url
      return false
    }
    return true
  }


  //CAMPOS FORMULARIO
  camposForm = [
    { tipo: 'text', clave: 'codUsuario', titulo: 'Codigo de Usuario', cols: 'col-12', validacion: true },
    { tipo: 'password', clave: 'contrasena', titulo: 'Contraseña', cols: 'col-12', validacion: true }

  ]
}


