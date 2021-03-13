import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Validators, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
//Modelo
import { Callcenter, CallcenterApi } from '../../models/modelMantenimientos/callcenters';
import { LoginService } from '../svcGeneral/login.service';
import { map } from 'rxjs/operators';
import { Apimodel } from 'src/app/models/modelGeneral/apimodel';
import { NotificacionCrud, NotificacionCrudApi } from 'src/app/models/modelGeneral/notificacion-crud';

@Injectable({
  providedIn: 'root'
})
export class CallcentersService {

  params = environment.Headers;
  baseURLList = environment.Mantenimientos.Callcenters.list;
  baseURLCreate = environment.Mantenimientos.Callcenters.create;
  baseURLEdit = environment.Mantenimientos.Callcenters.update;

  constructor(
    private svcLogin: LoginService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  //FORMULARIO
  form = this.formBuilder.group({
    idCallCenter: [0, Validators.required],
    descripcion: ['', Validators.required],
    estado: ['', Validators.required]
  });
  limpiarFormulario(): void {
    this.form.reset()
    this.form.setValue(new Callcenter())
    this.form.patchValue( {estado : 'Activo'} )
  }
  establecerValorDelFormulario(item: Callcenter) {
    this.form.patchValue(item)
  }

  /************METODOS****************/
  crearRegistro(): Observable<Apimodel> {
    let solicitud = Apimodel.convertirRespuestaSolicitudApi(this.form.value, 'callcenter', 'solicitud')
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

  editarRegistro(): Observable<Apimodel> {
    let solicitud = Apimodel.convertirRespuestaSolicitudApi(this.form.value, 'callcenter', 'solicitud')
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
        }
        ))
  }

  listarRegistros(): Observable<Apimodel> {
    let login = JSON.stringify({
      codUsuario: this.svcLogin.getToken('login')?.codUsuario
    })
    return this.http.post<Apimodel>(this.baseURLList, login, this.params)
      .pipe(
        map(data => {
          if(data.Error=="200"){
            const resultado: CallcenterApi[] = data.Resultado
            const resultadoConvertido: Callcenter[] = resultado.map(item => 
              Apimodel.convertirRespuestaSolicitudApi(item, 'callcenter', 'respuesta'))
  
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
