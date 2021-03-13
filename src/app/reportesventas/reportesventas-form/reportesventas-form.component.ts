import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DatePipe } from '@angular/common';
//MATERIAL
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
//SERVICIOS
import { PedidoService } from 'src/app/shared/svcPedidos/pedido.service';
import { PedidoArchivosService } from 'src/app/shared/svcPedidos/pedido-archivos.service';
import { PedidoProductosService } from 'src/app/shared/svcPedidos/pedido-productos.service';
import { NotificationService } from 'src/app/shared/svcCustom/notification.service';
import { PlanesService } from 'src/app/shared/svcMantenimientos/planes.service';
import { CampanasService } from 'src/app/shared/svcMantenimientos/campanas.service';
import { EstadoPedidoService } from 'src/app/shared/svcMaestros/estado-pedido.service';
import { LoginService } from 'src/app/shared/svcGeneral/login.service';
//SERVICIOS BLOB
import { BlobDeletesViewStateService } from 'src/app/azure-storage/services/blob-deletes-view-state.service';
//INTERFACES
import { Campana } from 'src/app/models/modelMantenimientos/campanas';
import { Plan } from 'src/app/models/modelMantenimientos/planes';
//COMPONENTES
//RXJS
import { Observable, Subject, Subscription } from 'rxjs';
//ADICIONALES
import { ListarCallCenterPorUsuarioService } from 'src/app/shared/svcMaestros/listar-call-center-por-usuario.service';
import { PedidoCabeceraService } from 'src/app/shared/svcPedidos/pedido-cabecera.service';
import { Pedido, PedidoProducto } from 'src/app/models';
import { Apimodel } from 'src/app/models/modelGeneral/apimodel';
import { flatMap, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-reportesventas-form',
  templateUrl: './reportesventas-form.component.html',
  styleUrls: ['./reportesventas-form.component.css'],
  providers: [
    {provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }},
    {provide: DatePipe}
  ]
})
export class ReportesventasFormComponent implements OnInit, OnDestroy {
  //OBSERVABLES
  //campanas$: Observable<any> = this.svcCampanas.listarRegistros()

  
  callCentersPorUsuario$: Observable<any> = this.svcCallCentersPorUsuario.listarRegistros()
  estadosPedidos$: Observable<any> = this.svcEstadoPedido.listarRegistros()

  //SUSCRIPCIONES
  eliminacionImagenesSubscription$!: Subscription;
  cambioCampanas$!: Subscription
  //FLAGS
  esImagen!: boolean;
  flagCampana!: number;
  flagEstadoPedido: number = 0;
  flagCallCenter: number = 0;
  editarFormulario!: boolean
  idFormularioPedido!: number
  formularioEnviado: boolean = false
  //FILTROS - otros
  campanas = []
  callCenterPorUsuario = []
  planesFiltroProducto!: Plan[]
  archivosPedido: Object[]=[]
  colorCampanaFondo!: string;
  colorCampanaTexto!: string;

  

  constructor(
    public svcPedido: PedidoService,
    public svcPedidoCabecera: PedidoCabeceraService,
    public svcPedidoArchivos: PedidoArchivosService,
    public svcPedidoProductos: PedidoProductosService,

    private svcCampanas: CampanasService,
    private svcPlanes: PlanesService,
    private svcEstadoPedido: EstadoPedidoService,
    public svcLogin: LoginService,
    private svcCallCentersPorUsuario: ListarCallCenterPorUsuarioService,

    public dialogRef: MatDialogRef<ReportesventasFormComponent>,
    public dialog: MatDialog,
    private notificationService: NotificationService,

    private blobDelete: BlobDeletesViewStateService,

    @Inject(MAT_DIALOG_DATA) data: formularioEdicion
    
  ) {
    this.editarFormulario = data.edicion
    this.idFormularioPedido = data.idPedido
   }

  ngOnDestroy(): void {
    //this.eliminacionImagenesSubscription$?.unsubscribe()
  }

  ngOnInit() {
    this.blobDelete.deleteQueueInner$.observers = []
    this.svcPedidoArchivos.archivosAgregados= []
    this.svcPedidoArchivos.archivosEliminados = []
    this.svcPedidoCabecera.form.get('flagPedidoAtipico').patchValue(0)

    //CAMPANAS-LISTADO, OBTENER PEDIDO, PLANES-LISTADO
    this.svcCampanas.listarRegistros()
      .pipe(
        mergeMap((campanas)=> 
          this.svcPedido.obtenerPedido(this.idFormularioPedido)
            .pipe(map(
              pedido => { return {campanas, pedido} }
            ))
        )
      )
      .pipe(
        mergeMap((x)=> 
          this.svcPlanes.listarRegistros()
          .pipe(map(
            planes => { 
              return {
                campanas: x.campanas, 
                pedido: x.pedido,
                planes: planes 
              }
            }
          ))
        )
      ).subscribe(
          data=>{
            if(data.campanas.Error=="200"){
              this.campanas = data.campanas.Resultado;
            }
            if(data.pedido.Error=="200"){
              if(this.editarFormulario == true){
              
                let response: Pedido = data.pedido.Resultado;
                this.svcPedido.pedidoCabecera.patchValue(response.pedidoCabecera[0])
                
                if(data.planes.Error=="200"){
                  if(this.svcPedidoCabecera.form.value.idPedido==0){
                    this.svcPedidoProductos.planes = data.planes.Resultado.filter((item: Plan)=>{
                      if(item.estado=='Activo'){
                        return item
                      }
                    })
                  }else{
                    this.svcPedidoProductos.planes = data.planes.Resultado
                  }
                }

      
                this.cambioCampana(this.svcPedido.pedidoCabecera.value.idCampana)
                this.cambioEstadoPedido(this.svcPedido.pedidoCabecera.value.idEstadoPedido)
                this.cambioCallCenter(this.svcPedido.pedidoCabecera.value.idCallCenter)
                
                const fecha = this.svcPedido.pedidoCabecera.value.fechaNacimiento.split("T")[0]
                this.svcPedido.pedidoCabecera.patchValue({
                  fechaNacimiento: fecha
                }) 
        
                response.pedidoArchivos.forEach((element: any) => {
                  this.svcPedidoArchivos.agregarArchivo(element)
                });
  
                //Asignamos el valor de las imagenes para el editado
                this.svcPedido.pedidoArchivos.value.forEach((element: any) => {
                  this.archivosPedido.push(element.nombreArchivo)
                });
                let contadorFibra = 0
                let contadorTv = 0
                let contadorLineasMoviles = 0
                response.pedidoProductos.forEach((element: PedidoProducto) => {
                  switch (element.idTipoProducto) {
                    case 1:
                      this.svcPedidoProductos.agregarProductoFibra()
                      this.svcPedido.pedidoProductosFibra.controls[contadorFibra].patchValue(element)
                      this.svcPedidoProductos.cambioRadioBtn(contadorFibra, 'flagMismoTitular', element.idTipoProducto)
                      this.svcPedidoProductos.cambioRadioBtn(contadorFibra, 'flagPortabilidad', element.idTipoProducto)
                      contadorFibra++
                      break;
                    case 4:
                      this.svcPedidoProductos.agregarProductoTvMovil()
                      this.svcPedido.pedidoProductosTvMovil.controls[contadorTv].patchValue(element)
                      contadorTv++
                      break;
                    default:
                      this.svcPedidoProductos.agregarProductoLineasMoviles(element.idTipoProducto)
                      this.svcPedido.pedidoProductosLineaMovil.controls[contadorLineasMoviles].patchValue(element)
                      this.svcPedidoProductos.cambioRadioBtn(contadorLineasMoviles, 'flagMismoTitular', element.idTipoProducto)
                      this.svcPedidoProductos.cambioRadioBtn(contadorLineasMoviles, 'flagPortabilidad', element.idTipoProducto)
                      this.svcPedidoProductos.cambioSelect(contadorLineasMoviles, 'idTipoPlan')
                      contadorLineasMoviles++
                  }
                });
                this.svcPedido.pedidoCostes.patchValue(response.pedidoCostes[0])
                //actualizamos la lista de string a array
                if(this.svcPedido.pedidoProductosTvMovil.value[0]!=undefined){
                  if(this.svcPedido.pedidoProductosTvMovil.value[0].idsPaquetesTV!=undefined){
                    let frmProductoTvmovil = this.svcPedido.pedidoProductosTvMovil.controls[0]
                    let arrConvertido: number[] = []
                    frmProductoTvmovil.get('idsPaquetesTV')?.value.split(",").forEach((element : any) => {
                      arrConvertido.push(parseInt(element))
                    });
                    frmProductoTvmovil.patchValue({
                        idsPaquetesTV: arrConvertido
                    })
                  }
                }
          
            }else{
              this.flagCampana = 0
              if(this.svcLogin.getToken('login').idTipoUsuario == '1'){
                this.svcPedido.pedidoCabecera.get('idCallCenter')?.setValue(this.svcLogin.getToken('login').idCallCenter)
              }
              if(data.planes.Error=="200"){
                if(this.svcPedidoCabecera.form.value.idPedido==0){
                  this.svcPedidoProductos.planes = data.planes.Resultado.filter((item: Plan)=>{
                    if(item.estado=='Activo'){
                      return item
                    }
                  })
                }else{
                  this.svcPedidoProductos.planes = data.planes.Resultado
                }
              }
            }
            }
            
          },
          error => console.error(error)
        )

    //Comprobamos si es una edicion o creacion de pedido
    //Nos suscribimos a la eliminacion de archivos
    this.eliminacionImagenesSubscription$ = this.blobDelete.deletedItems$.subscribe()
    //Nos suscribimos a la descarga de archivos
    //this.blobDownload.downloadedItems$

    //CAMBIOS EN LOS FORMULARIO
      this.cambioCampanas$ = this.svcPedido.pedidoCabecera.get('idCampana')?.valueChanges.subscribe(val=>{
        this.cambioCampana(val)
      })
  }

  /***********************REQUEST-RESPONSE API*********** */
  onSubmit() {

    //Conversion de la fecha y el multiselect(de array->lista de string)
    /*const frmCabecera = this.svcPedido.pedido.value;
    frmCabecera.fechaNacimiento   = this.datePipe.transform(frmCabecera.fechaNacimiento, 'yyyy-MM-dd');*/

    const frmProductoTvmovil = this.svcPedido.pedidoProductosTvMovil.value[0]
    if(frmProductoTvmovil !=undefined){
      if(frmProductoTvmovil.idsPaquetesTV!= undefined){
        frmProductoTvmovil.idsPaquetesTV = frmProductoTvmovil.idsPaquetesTV.toString()
      }
    }       
    //Request de creacion de registro
        this.svcPedido.crearRegistro().subscribe(
          (data: any) => {
            if(data.Error=="200"){
              this.notificationService.success(data.Resultado[0].respuesta)
              this.formularioEnviado= true
              this.onClose();
            }
            else{this.notificationService.warn(data.Mensaje)} 
          },
          error => console.error(error)
        );
 
  }
  onClose() {
    this.cambioCampanas$.unsubscribe()

    if(this.formularioEnviado==false){
      let archisvosEditados =this.svcPedidoArchivos.archivosAgregados.concat(this.svcPedidoArchivos.archivosEliminados)
      let archisvosEditadosUnicos = [...new Set(archisvosEditados)]
      archisvosEditadosUnicos?.forEach((element: any) => {
        if(this.archivosPedido.indexOf(element)==-1){
          this.blobDelete.deleteItem(element);
        }   
      });
      this.dialogRef.close(false);
    }else{
      this.svcPedidoArchivos.archivosEliminados?.forEach((element: any) => {
        this.blobDelete.deleteItem(element);
      });
      this.dialogRef.close(true);
    }
    this.archivosPedido = []
    this.svcPedidoArchivos.archivosAgregados = []
    this.svcPedidoArchivos.archivosEliminados = []
    this.svcPedido.limpiarFormularioGeneral();
  }
  onClear() {
    this.svcPedido.limpiarFormularioGeneral();
  }

  //METODOS GENERAL
  cambioEstadoPedido(value:any){
    this.flagEstadoPedido=value
    this.svcPedido.pedidoCabecera.patchValue({
      idEstadoPedido: value
    })
  }
  cambioCallCenter(value:any){
    this.flagCallCenter=value
    this.svcPedido.pedidoCabecera.patchValue({
      idCallCenter: value
    })
  }

  
  //METODOS_PEDIDO_PRODUCTO
  cambioCampana(value:any) {
    this.flagCampana=value
    switch(value){
      case 1://VODAFONE
        this.colorCampanaFondo="#f44336"
        this.colorCampanaTexto="white"
        break
      case 2:
        this.colorCampanaFondo="#ffdf00"
        this.colorCampanaTexto="black"
        break
      case 3:
        this.colorCampanaFondo="#ff4081"
        this.colorCampanaTexto="white"
        break
    }
      this.svcPedidoCabecera.enviarCampanaFiltro(this.campanas.filter((campana: Campana) => {
        return campana.idCampana == value
      }))
      this.svcPedidoProductos.planesFiltroCampana = this.svcPedidoProductos.planes?.filter((plan: Plan) => {
        return plan.idCampana == value
      })
  }
  //STEPS
   step=0;
   setStep(index: number) {
     this.step = index;
   }
   nextStep() {
     this.step++;
   }
   prevStep() {
     this.step--;
   }


}

export interface formularioEdicion {
  idPedido: number,
  edicion: boolean
}