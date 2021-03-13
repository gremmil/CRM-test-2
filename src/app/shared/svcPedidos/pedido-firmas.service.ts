import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apimodel } from 'src/app/models/modelGeneral/apimodel';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginService } from '../svcGeneral/login.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoFirmasService {

  constructor(
    private http: HttpClient,
    private svcLogin: LoginService
  ) { }

  params = environment.Headers;
  baseURLList = environment.Notificaciones.list;
  baseURLCreate = environment.Notificaciones.list;
  baseURLDelete = environment.Notificaciones.list;
  baseURLDesactivar = environment.Notificaciones.update;

  eliminarRegistro(id: number): Observable<Apimodel>{
    const request = {
      idPedido: id,
      codUsuario: this.svcLogin.getToken('login')?.CodUsuario
    }
    return this.http.post<Apimodel>(this.baseURLDelete, request, this.params);
  }
  crearRegistro(id: number, url: string): Observable<Apimodel> {
    const request = {
      idPedido: id,
      urlImagenFirma: url
    }
    return this.http.post<Apimodel>(this.baseURLCreate, request, this.params);
  }
  desactivarRegistro(id: number): Observable<Apimodel> {
    const request=JSON.stringify({
      idTipoUsuario: this.svcLogin.getToken('login')?.IdTipoUsuario,
      idPedido: id
    })
    return this.http.post<Apimodel>(this.baseURLDesactivar, request, this.params);
  }
  listarRegistros(): Observable<Apimodel> {
    const request=JSON.stringify({
      codUsuario: this.svcLogin.getToken('login')?.CodUsuario,
      idTipoUsuario: this.svcLogin.getToken('login')?.IdTipoUsuario
    })
    return this.http.post<Apimodel>(this.baseURLList, request, this.params);
  }
}
