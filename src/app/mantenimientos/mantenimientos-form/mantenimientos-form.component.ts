import { Component, ComponentRef, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '../../shared/svcCustom/notification.service';
import { TipoProductoService } from '../../shared/svcMaestros/tipo-producto.service';
import { TipoUsuarioService } from '../../shared/svcMaestros/tipo-usuario.service';
import { CallcentersService } from '../../shared/svcMantenimientos/callcenters.service';
import { CampanasService } from '../../shared/svcMantenimientos/campanas.service';
import { MantenimientosService } from '../../shared/svcMantenimientos/mantenimientos.service';
import { Observable, Subscription } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-mantenimientos-form',
  templateUrl: './mantenimientos-form.component.html',
  styleUrls: ['./mantenimientos-form.component.css']
})
export class MantenimientosFormComponent implements OnInit {
  camposForm!: any
  form!: FormGroup | undefined
  componenteActual!: any

  campanas$!:  Observable<any>
  callcenters$!:  Observable<any>
  tipoProductos$!:  Observable<any>
  tipoUsuarios$!:  Observable<any>

  callCentersBackOffice = []
  cambioTipoUsuario$!: Subscription | undefined

  //
  flagEdicionFormulario!: boolean

  constructor(
    public svcMantenimientos: MantenimientosService,
    public dialogRef: MatDialogRef<MantenimientosFormComponent>,
    private notificationService: NotificationService,

    private svcListarTipoProductos: TipoProductoService,
    private svcListarTipoUsuarios: TipoUsuarioService,
    private svcCampanas: CampanasService,
    private svcCallCenters: CallcentersService,
    @Inject(MAT_DIALOG_DATA) data: any

  ) {
    this.form = this.svcMantenimientos.obtenerCRUD()?.form
    this.camposForm = this.svcMantenimientos.obtenerCamposForm()
    this.flagEdicionFormulario = data.edicion
   }

  ngOnInit(): void {
    this.componenteActual = this.svcMantenimientos.componenteActual?.toLowerCase().replace(/\b[a-z]/g, function(letter) {
      return letter.toUpperCase();
    })
    if(this.componenteActual == 'Campanas'){
      this.componenteActual = this.componenteActual.replace('n','ñ')
    }
    switch(this.svcMantenimientos.componenteActual){
      case 'planes':
        this.campanas$ = this.svcCampanas.listarRegistros()
        this.tipoProductos$ = this.svcListarTipoProductos.listarRegistros()
      break;
      case 'usuarios':
        this.callcenters$ = this.svcCallCenters.listarRegistros()
        this.tipoUsuarios$ = this.svcListarTipoUsuarios.listarRegistros()

        this.callCentersBackOffice = this.svcMantenimientos.obtenerCRUD()?.form.controls['idCallCenter'].value
        this.cambioTipoUsuario$ = this.svcMantenimientos.obtenerCRUD()?.form.controls['idTipoUsuario'].valueChanges.subscribe(val => {
          let ctrlIdCallCenter = this.svcMantenimientos.obtenerCRUD()?.form.controls['idCallCenter']
          switch(val){
            case 1://ASESOR
              ctrlIdCallCenter?.reset()
              ctrlIdCallCenter?.enable()
              break;
            case 2://BACKOFFICE
              this.callCentersBackOffice = []
              ctrlIdCallCenter?.reset()
              ctrlIdCallCenter?.enable()
              break;
            case 3://ADMINISTRADOR
              ctrlIdCallCenter?.reset()
              ctrlIdCallCenter?.setValue(0)
              ctrlIdCallCenter?.disable()
              break;
          }
       });
       break;
    }

    
    if(this.svcMantenimientos.obtenerCRUD()?.form.controls['estado'].value=='Activo'){
      this.svcMantenimientos.obtenerCRUD()?.form.patchValue({
        estado: true
      })
    }else{
      this.svcMantenimientos.obtenerCRUD()?.form.patchValue({
        estado: false
      })
    }
  }

  //METODOS
  enviarFormulario(){
    let swt: any = this.svcMantenimientos.obtenerCRUD()?.form.controls['estado'].value;
    if(swt==true || swt=='Activo'){
      this.svcMantenimientos.obtenerCRUD()?.form.patchValue(
        {
          estado: 'Activo'
        }
      );
    }else{
      this.svcMantenimientos.obtenerCRUD()?.form.patchValue(
        {
          estado: 'Inactivo'
        }
      );
    }
    if(this.svcMantenimientos.componenteActual=='usuarios'){
      let ctrlIdTipoUsuario = this.svcMantenimientos.obtenerCRUD()?.form.controls['idTipoUsuario']

      switch(ctrlIdTipoUsuario?.value){
        case 1://ASESOR
          this.svcMantenimientos.obtenerCRUD()?.form.controls['idCallCenter'].patchValue(this.svcMantenimientos.obtenerCRUD()?.form.controls['idCallCenter'].value.toString())
        break;
        case 2://BACKOFFICE
          this.svcMantenimientos.obtenerCRUD()?.form.controls['idCallCenter'].patchValue(this.svcMantenimientos.obtenerCRUD()?.form.controls['idCallCenter'].value.toString())
        break;
        case 3://ADMINISTRADOR
          this.svcMantenimientos.obtenerCRUD()?.form.controls['idCallCenter'].enable()  
          this.svcMantenimientos.obtenerCRUD()?.form.controls['idCallCenter'].patchValue(this.svcMantenimientos.obtenerCRUD()?.form.controls['idCallCenter'].value.toString())
        break;
      }
    }
    if(this.flagEdicionFormulario==false){
        this.svcMantenimientos.obtenerCRUD()?.crearRegistro().subscribe(
          (data: any) => {
            if(data.Error=="200"){
              this.cerrarFormulario();
              this.notificationService.success(data.Resultado[0].respuesta)
            }
            else{this.notificationService.warn(data.Mensaje)} 
          },
          error => console.error(error)
        );
    }else{
      this.svcMantenimientos.obtenerCRUD()?.editarRegistro().subscribe(
        (data: any) => {
          if(data.Error=="200"){
            this.cerrarFormulario();
            this.notificationService.success(data.Resultado[0].respuesta)
            
          }
          else{this.notificationService.warn(data.Mensaje)} 
        },
        error => console.error(error)
      );
    }
  }
  limpiarFormulario(){
    if(this.svcMantenimientos.componenteActual == 'usuarios'){
      this.svcMantenimientos.obtenerCRUD()?.form.controls['idCallCenter'].patchValue('')
    }
    this.svcMantenimientos.obtenerCRUD()?.limpiarFormulario()
  }
  cerrarFormulario() {
    this.dialogRef.close(true)
    timeout(2000)
    this.svcMantenimientos.obtenerCRUD()?.limpiarFormulario();
  }
  cambioSelect(value: any){
    this.svcMantenimientos.obtenerCRUD()?.form.controls['idCallCenter'].patchValue(value)
  }
  

}
