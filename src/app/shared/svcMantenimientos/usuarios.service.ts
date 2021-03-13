import { Injectable } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

//Modelo
import { LoginService } from '../svcGeneral/login.service';
import { Usuario, UsuarioApi, NotificacionCrudApi, NotificacionCrud } from 'src/app/models';
import { Apimodel } from 'src/app/models/modelGeneral/apimodel';


import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  params = environment.Headers;
  baseURLList = environment.Mantenimientos.Usuarios.list;
  baseURLCreate = environment.Mantenimientos.Usuarios.create;
  baseURLEdit = environment.Mantenimientos.Usuarios.update;

  constructor(
    private svcLogin: LoginService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  //FORMULARIO
  form = this.formBuilder.group({
    idUsuario: [0, Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    idCallCenter: ['', Validators.required],
    callCenter: [''],
    idTipoUsuario: ['', Validators.required],
    tipoUsuario: [''],
    usuario: ['', Validators.required],
    contrasena: ['', Validators.required],
    estado: ['', Validators.required]

  });
  limpiarFormulario(): void {
    this.form.reset()
    this.form.setValue(new Usuario())
    this.form.patchValue( {estado : 'Activo'} )
  }
  establecerValorDelFormulario(item: Usuario) {
    this.form.patchValue(item)
  }

  /************METODOS****************/
  crearRegistro():  Observable<Apimodel> {
    let solicitud = Apimodel.convertirRespuestaSolicitudApi(this.form.value, 'usuario', 'solicitud')
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
        }))
  }
  
  editarRegistro():  Observable<Apimodel> {
    let solicitud = Apimodel.convertirRespuestaSolicitudApi(this.form.value, 'usuario', 'solicitud')
    return this.http.post<Apimodel>(this.baseURLEdit, solicitud, this.params)
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

  listarRegistros(): Observable<Apimodel> {
    let login = JSON.stringify({
      codUsuario: this.svcLogin.getToken('login')?.codUsuario
    })
    return this.http.post<Apimodel>(this.baseURLList, login, this.params)
    .pipe(
      map(data => {
        if(data.Error=="200"){
          const resultado: UsuarioApi[] = data.Resultado
          const resultadoConvertido: Usuario[] = resultado.map(item => 
            Apimodel.convertirRespuestaSolicitudApi(item, 'usuario', 'respuesta'))
  
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
