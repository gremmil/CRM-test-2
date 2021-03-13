import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../../shared/svcGeneral/login.service';
import { Router } from '@angular/router';
import { NotificacionesComentariosPedidosService } from '../../../shared/svcNotificaciones/notificaciones-comentarios-pedidos.service';
import { ComentariosPedidosService } from '../../../shared/svcComentarios/comentarios-pedidos.service';
import { interval, Subscription } from 'rxjs';
import { NotificacionComentarioPedido } from 'src/app/models';
import { Apimodel } from 'src/app/models/modelGeneral/apimodel';
import { NotificacionesFirmasPedidosService } from 'src/app/shared/svcNotificaciones/notificaciones-firmas-pedidos.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class AppHeaderComponent implements OnInit, OnDestroy  {
  visible = false;
  notificacionesComentarios: NotificacionComentarioPedido[] = []
  notificacionesFirmas: NotificacionComentarioPedido[] = []
  contadorNotificacionesComentarios!: number
  contadorNotificacionesFirmas!: number

  requestNotificaciones!: Subscription

  constructor(
    public svcLogin: LoginService,
    private svcComentariosPedido: ComentariosPedidosService,
    private router: Router,
    private svcNotificacionesComentariosPedido: NotificacionesComentariosPedidosService,
    private svcNotificacionesFirmasPedido: NotificacionesFirmasPedidosService
    ){
  }
  ngOnDestroy(): void {
    this.requestNotificaciones.unsubscribe()
  }
  ngOnInit(): void {
    const intervalRequest = interval(5000)
    this.requestNotificaciones = intervalRequest.subscribe(()=>{
      this.svcNotificacionesComentariosPedido.listarRegistros().subscribe(
        (data : Apimodel) => {
          this.notificacionesComentarios = data.Resultado.notificaciones
          this.contadorNotificacionesComentarios = data.Resultado.cantidad[0].cantidad
      },
      error => console.error(error)
      )
      this.svcNotificacionesFirmasPedido.listarRegistros().subscribe(
        (data : Apimodel) => {
          this.notificacionesFirmas = data.Resultado.notificaciones
          this.contadorNotificacionesFirmas = data.Resultado.cantidad[0].cantidad
      },
      error => console.error(error)
      )
    }) 
  }
 
  abrirNotificacion(id: number, tipo: string){
    switch(tipo){
      case 'comentarios':
        this.svcNotificacionesComentariosPedido.enviarIdPedido(id) 
        break;
        case 'firmas':
          this.svcNotificacionesFirmasPedido.enviarIdPedido(id) 
        break;
    }
  }
  cerrarSesion(){
    this.svcComentariosPedido.closeChat()
    this.svcLogin.destroyToken('login');
    this.router.navigate(['/login'],{ replaceUrl: true })
  }

}
