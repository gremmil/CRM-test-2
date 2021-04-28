import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../../shared/svcGeneral/login.service';
import { Router } from '@angular/router';
import { ComentariosPedidosService } from '../../../shared/svcComentarios/comentarios-pedidos.service';
import { NotificacionComentarioPedido } from 'src/app/models';


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

  constructor(
    public svcLogin: LoginService,
    private svcComentariosPedido: ComentariosPedidosService,
    private router: Router,
    ){
  }
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
  }
 
  cerrarSesion(){
    this.svcComentariosPedido.closeChat()
    this.svcLogin.destroyToken('login');
    this.router.navigate(['/login'],{ replaceUrl: true })
  }

}
