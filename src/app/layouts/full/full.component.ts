import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, AfterViewInit, OnInit } from '@angular/core';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { LoginService } from '../../shared/svcGeneral/login.service';
import { Router } from '@angular/router';



/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: []
})

export class FullComponent implements OnDestroy, AfterViewInit, OnInit {
  /*@ViewChild('sidenav') sidenav: any;
  toggleSidenav() {
    this.sidenav.toggle();
    console.log(this.sidenav.toggle);
  }*/
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    public svcLogin: LoginService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
    /*if (cookieUsuario == '') {
      this.router.navigate(['/login'])
    } else {
      this.session = {
        CodUsuario: cookieUsuario,
        NombreCompleto: this.svcLogin.getToken('NombreCompleto'),
        IdTipoUsuario: this.svcLogin.getToken('IdTipoUsuario'),
        TipoUsuario: this.svcLogin.getToken('TipoUsuario')
      }
    }*/
    
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() { }
}
