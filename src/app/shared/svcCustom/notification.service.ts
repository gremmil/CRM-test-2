import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { NotificacionesComponent } from 'src/app/components/notificaciones/notificaciones.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    public snackBar: MatSnackBar
    ) { }

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    data: {
      mensaje: '',
      accion: ''
    }
  }
  success(msg: any) {
    this.config.data.mensaje = msg
    this.config.data.accion = 'exito'
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.openFromComponent(NotificacionesComponent, this.config);
  }

  warn(msg: any) {
    this.config.data.mensaje = msg
    this.config.data.accion = 'error'
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.openFromComponent(NotificacionesComponent, this.config);
  }
}
