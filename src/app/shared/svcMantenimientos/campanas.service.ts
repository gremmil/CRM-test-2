import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Validators, FormBuilder } from '@angular/forms';
//Modelo
import { Campana, CampanaApi } from '../../models/modelMantenimientos/campanas';
import { LoginService } from '../svcGeneral/login.service';
import { map } from 'rxjs/operators';
import { NotificacionCrud, NotificacionCrudApi } from 'src/app/models/modelGeneral/notificacion-crud';
import { Apimodel } from 'src/app/models/modelGeneral/apimodel';

@Injectable({
  providedIn: 'root'
})
export class CampanasService {

  params = environment.Headers;
  baseURLList = environment.Mantenimientos.Campanas.list;
  baseURLCreate = environment.Mantenimientos.Campanas.create;
  baseURLEdit = environment.Mantenimientos.Campanas.update;

  constructor(
    private svcLogin: LoginService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  //FORMULARIO
  form = this.formBuilder.group({
    idCampana: [0, Validators.required],
    descripcion: ['', Validators.required],
    archivosAdjuntos: ['', Validators.required],
    contenedor: [''],
    estado: ['', Validators.required]
  });

  limpiarFormulario(): void {
    this.form.reset()
    this.form.setValue(new Campana())
    this.form.get('estado').patchValue('Activo')
  }
  establecerValorDelFormulario(item: Campana) {
    this.form.patchValue(item)
  }

  /************METODOS****************/
  crearRegistro(): Observable<Apimodel> {
    let solicitud = Apimodel.convertirRespuestaSolicitudApi(this.form.value, 'campana', 'solicitud')
    return this.http.post<Apimodel>(this.baseURLCreate, solicitud, this.params)
      .pipe(
        map(data => {
          if(data.Error=="200"){
            const resultado: NotificacionCrudApi[] = data.Resultado
            const resultadoConvertido: NotificacionCrud[] = resultado.map(item => 
              Apimodel.convertirRespuestaSolicitudApi(item, 'notificacioncrud', 'respuesta')
              )
  
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
    let solicitud = Apimodel.convertirRespuestaSolicitudApi(this.form.value, 'campana', 'solicitud')
    return this.http.post<Apimodel>(this.baseURLEdit, solicitud, this.params)
      .pipe(
        map(data => {
          if(data.Error=="200"){
            const resultado: NotificacionCrudApi[] = data.Resultado
            const resultadoConvertido: NotificacionCrud[] = resultado.map(item => 
              Apimodel.convertirRespuestaSolicitudApi(item, 'notificacioncrud', 'respuesta')
              )
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
            const resultado: CampanaApi[] = data.Resultado
            const resultadoConvertido: Campana[] = resultado.map(item => 
              Apimodel.convertirRespuestaSolicitudApi(item, 'campana', 'respuesta')
              )
  
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