import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComentariosPedidosService } from '../../shared/svcComentarios/comentarios-pedidos.service';
import { LoginService } from 'src/app/shared/svcGeneral/login.service';
import { NotificationService } from 'src/app/shared/svcCustom/notification.service';
import { Observable } from 'rxjs';
import { Apimodel } from 'src/app/models/modelGeneral/apimodel';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  idPedido!: number
  esNotificacion!: boolean
  comentarios$!: Observable<any>

  constructor(
    public dialogRef: MatDialogRef<ComentariosComponent>,
    public svcComentarios: ComentariosPedidosService,
    public svcLogin: LoginService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.idPedido=data.idPedido
    this.esNotificacion=data.notificacion
   }


  events: string[] = [];
  opened!: boolean;
  panelOpenState = false;
  
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.svcComentarios.limpiarFormulario()
    this.comentarios$ = this.svcComentarios.listarRegistros(this.idPedido)    
  }
  /***********************REQUEST-RESPONSE API*********** */
  onSubmit() {
    this.svcComentarios.form.get('idPedido')?.patchValue(this.idPedido)
    this.svcComentarios.crearRegistro().subscribe(
      (data: Apimodel) => {
        if(data.Error=="200"){
          this.svcComentarios.limpiarFormulario()
          this.ngOnInit()
          //this.notificationService.success(data.Resultado[0].Respuesta)
          //this.onClose();
        }
        else{this.notificationService.warn(data.Mensaje)} 
      },
      error => console.error(error)
    )
  }
  onClose() {
    this.svcComentarios.limpiarFormulario()
    this.dialogRef.close(this.esNotificacion);
  }
  onClear() {
    this.svcComentarios.limpiarFormulario()
  }
  getClassDialogContent(comentario: any){
    let estilo= {}
    if(comentario.nombreCompleto==this.svcLogin.getToken('login')?.nombreCompleto){
      estilo={
        alineacionTexto: 'text-right',
        alineacionContenedor: 'd-flex justify-content-end',
        color: 'accent'
      }
    }else{
      estilo={
        alineacionTexto: 'text-left',
        alineacionContenedor: 'd-flex justify-content-start',
        color: 'warn'
      }
    }
    return estilo
  }

}
