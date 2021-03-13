import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';

import { LoginService } from '../../../shared/svcGeneral/login.service'
import { Router } from '@angular/router';

import { ComentariosPedidosService } from '../../../shared/svcComentarios/comentarios-pedidos.service'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy, OnInit {
  nombreCompleto!: string;
  tipoUsuario!: string;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    public svcLogin: LoginService,
    private svcComentariosPedido: ComentariosPedidosService,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.nombreCompleto = this.svcLogin.getToken('login').nombreCompleto;
    this.tipoUsuario = this.svcLogin.getToken('login').tipoUsuario;

  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  cerrarSesion(){
    this.svcComentariosPedido.closeChat()
    this.svcLogin.destroyToken('login');
    this.router.navigate(['/login'],{ replaceUrl: true })
  }
}
