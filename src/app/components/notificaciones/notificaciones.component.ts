import { Component, OnInit, Inject } from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';


@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {
  mensajeNotificacion!: string
  accion!: string
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { 
    this.mensajeNotificacion = data.mensaje
    this.accion = data.accion
  }

  ngOnInit(): void {
  }

}
