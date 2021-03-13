import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../shared/svcGeneral/login.service';


import { NotificationService } from 'src/app/shared/svcCustom/notification.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Apimodel } from 'src/app/models/modelGeneral/apimodel';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  routeRedirect = ''
  spinnerON = false
  constructor(
    private svcNotificacion: NotificationService,
    private router: Router,
    public svcLogin: LoginService,
    public dialogRef: MatDialogRef<LoginFormComponent>

  ) { }

  ngOnInit(): void {
  }
  /********METODOS********/

  onSubmit() {
    this.spinnerON = true
    this.svcLogin.validarLogin().subscribe(
      (data: Apimodel) => {
        if (data.Error == "200") {
          //this.svcNotificacion.success(data.Resultado[0].Respuesta)
          this.svcLogin.setToken('login', data.Resultado[0]);
          this.routeRedirect = this.svcLogin.urlUsuarioIntentaAcceder
          this.svcLogin.urlUsuarioIntentaAcceder = ''
          this.onClose();
          this.router.navigate([this.routeRedirect]);
        }
        else {
          this.spinnerON = false
          this.svcNotificacion.warn(data.Mensaje)
        }
      }
    );
  }
  onClose() {
    this.dialogRef.close();
    this.svcLogin.limpiarFormulario();

  }
  onClear() {
    this.svcLogin.limpiarFormulario();
  }

}
