import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
//SERVICIO
import { LoginService } from '../svcGeneral/login.service';
//MODELO
import { Plan, PlanApi, NotificacionCrudApi, NotificacionCrud } from 'src/app/models';
import { Apimodel } from 'src/app/models/modelGeneral/apimodel';


import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  params = environment.Headers;
  baseURLList = environment.Mantenimientos.Planes.list;
  baseURLCreate = environment.Mantenimientos.Planes.create;
  baseURLEdit = environment.Mantenimientos.Planes.update;

  constructor(
    private svcLogin: LoginService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  //FORMULARIO
  form = this.formBuilder.group({
    idPlan: [0, Validators.required],
    plan: ['', Validators.required],
    idCampana: ['', Validators.required],
    campana: [''],
    idTipoProducto: ['', Validators.required],
    tipoProducto: [''],
    estado: ['', Validators.required]
  });

  limpiarFormulario(): void {
    this.form.reset()
    this.form.setValue(new Plan())
    this.form.patchValue( {estado : 'Activo'} )
  }
  establecerValorDelFormulario(item: Plan) {
    this.form.patchValue(item)
  }

  /************METODOS****************/
  crearRegistro(): Observable<Apimodel> {
    let solicitud = Apimodel.convertirRespuestaSolicitudApi(this.form.value, 'plan', 'solicitud')
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
    let solicitud = Apimodel.convertirRespuestaSolicitudApi(this.form.value, 'plan', 'solicitud')
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
            const resultado: PlanApi[] = data.Resultado
            const resultadoConvertido: Plan[] = resultado.map(item => 
              Apimodel.convertirRespuestaSolicitudApi(item, 'plan', 'respuesta'))
  
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
