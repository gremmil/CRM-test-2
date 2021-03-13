import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Pedido, PedidoProducto } from 'src/app/models';
import { NotificationService } from 'src/app/shared/svcCustom/notification.service';
import { LoginService } from 'src/app/shared/svcGeneral/login.service';
import { EstadoPedidoService } from 'src/app/shared/svcMaestros/estado-pedido.service';
import { ListarCallCenterPorUsuarioService } from 'src/app/shared/svcMaestros/listar-call-center-por-usuario.service';
import { PedidoArchivosService } from 'src/app/shared/svcPedidos/pedido-archivos.service';
import { PedidoCabeceraService } from 'src/app/shared/svcPedidos/pedido-cabecera.service';
import { PedidoCostesService } from 'src/app/shared/svcPedidos/pedido-costes.service';
import { PedidoProductosService } from 'src/app/shared/svcPedidos/pedido-productos.service';
import { PedidoService } from 'src/app/shared/svcPedidos/pedido.service';
import { Campana } from '../../models/modelMantenimientos/campanas';
import { Plan } from '../../models/modelMantenimientos/planes';
import { TipoDocumentoService } from '../../shared/svcMaestros/tipo-documento.service';
import { CampanasService } from '../../shared/svcMantenimientos/campanas.service';
import { PlanesService } from '../../shared/svcMantenimientos/planes.service';
import { formularioEdicion } from '../reportesventas-form/reportesventas-form.component';

@Component({
  selector: 'app-reportesventas-form-atipico',
  templateUrl: './reportesventas-form-atipico.component.html',
  styleUrls: ['./reportesventas-form-atipico.component.css']
})
export class ReportesventasFormFirmasComponent implements OnInit {

  callCentersPorUsuario$: Observable<any> = this.svcCallCentersPorUsuario.listarRegistros()
  estadosPedidos$: Observable<any> = this.svcEstadoPedido.listarRegistros()
  tiposDocumentos$: Observable<any> = this.svcTipoDocumento.listarRegistros()

  //SUSCRIPCIONES
  cambioCampanas$!: Subscription
  //FLAGS
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
  archivosPedido: Object[] = []
  colorCampanaFondo!: string;
  colorCampanaTexto!: string;


  constructor(
    public svcPedido: PedidoService,
    public svcPedidoCabecera: PedidoCabeceraService,
    public svcPedidoProductos: PedidoProductosService,
    public svcPedidoCostes: PedidoCostesService,

    private svcCampanas: CampanasService,
    private svcPlanes: PlanesService,
    private svcEstadoPedido: EstadoPedidoService,
    public svcLogin: LoginService,
    private svcCallCentersPorUsuario: ListarCallCenterPorUsuarioService,
    private svcTipoDocumento: TipoDocumentoService,

    private notificationService: NotificationService,
    public dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) data: formularioEdicion,
    public dialogRef: MatDialogRef<ReportesventasFormFirmasComponent>,

  ) {
    this.editarFormulario = data.edicion
    this.idFormularioPedido = data.idPedido
  }

  ngOnInit(): void {
    //ProductosFibra
    this.svcPedidoProductos.agregarProductoFibraAtipico()
    this.svcPedidoCabecera.form.get('flagPedidoAtipico').patchValue(1)
    this.svcPedidoCabecera.deshabilitarCampos()
    this.svcPedidoCostes.deshabilitarCampos()
    //CAMPANAS-LISTADO, OBTENER PEDIDO, PLANES-LISTADO
    this.svcCampanas.listarRegistros()
      .pipe(
        mergeMap((campanas) =>
          this.svcPedido.obtenerPedido(this.idFormularioPedido)
            .pipe(map(
              pedido => { return { campanas, pedido } }
            ))
        )
      )
      .pipe(
        mergeMap((x) =>
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
        data => {
          if (data.campanas.Error == "200") {
            this.campanas = data.campanas.Resultado;
          }
          if (data.pedido.Error == "200") {
            if (this.editarFormulario == true) {

              let response: Pedido = data.pedido.Resultado;
              this.svcPedido.pedidoCabecera.patchValue(response.pedidoCabecera[0])

              if (data.planes.Error == "200") {
                if (this.svcPedidoCabecera.form.value.idPedido == 0) {
                  this.svcPedidoProductos.planes = data.planes.Resultado.filter((item: Plan) => {
                    if (item.estado == 'Activo') {
                      return item
                    }
                  })
                } else {
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
              let contadorFibra = 0
              let contadorLineasMoviles = 0
              response.pedidoProductos.forEach((element: PedidoProducto) => {
                switch (element.idTipoProducto) {
                  case 1:
                    this.svcPedido.pedidoProductosFibra.controls[contadorFibra]?.patchValue(element)
                    contadorFibra++
                    break;
                  default:
                    this.svcPedidoProductos.agregarProductoLineasMoviles(element.idTipoProducto)
                    this.svcPedido.pedidoProductosLineaMovil.controls[contadorLineasMoviles].patchValue(element)
                    this.svcPedidoProductos.cambioSelect(contadorLineasMoviles, 'idTipoPlan')
                    contadorLineasMoviles++
                }
              });
              this.svcPedido.pedidoCostes.patchValue(response.pedidoCostes[0])
            } else {
              this.flagCampana = 0
              if (this.svcLogin.getToken('login').idTipoUsuario == '1') {
                this.svcPedido.pedidoCabecera.get('idCallCenter')?.setValue(this.svcLogin.getToken('login').idCallCenter)
              }
              if (data.planes.Error == "200") {
                if (this.svcPedidoCabecera.form.value.idPedido == 0) {
                  this.svcPedidoProductos.planes = data.planes.Resultado.filter((item: Plan) => {
                    if (item.estado == 'Activo') {
                      return item
                    }
                  })
                } else {
                  this.svcPedidoProductos.planes = data.planes.Resultado
                }
              }
            }
          }

        },
        error => console.error(error)
      )

    //CAMBIOS EN LOS FORMULARIO
    this.cambioCampanas$ = this.svcPedido.pedidoCabecera.get('idCampana')?.valueChanges.subscribe(val => {
      this.cambioCampana(val)
    })

  }
  onSubmit() {

    this.svcPedidoCabecera.form.get('fechaNacimiento').patchValue('01/01/1900')
    //Request de creacion de registro
    this.svcPedido.crearRegistro().subscribe(
      (data: any) => {
        if (data.Error == "200") {
          this.notificationService.success(data.Resultado[0].respuesta)
          this.formularioEnviado = true
          this.onClose();
        }
        else { this.notificationService.warn(data.Mensaje) }
      },
      error => console.error(error)
    );

  }

  //METODOS GENERAL
  cambioEstadoPedido(value: any) {
    this.flagEstadoPedido = value
    this.svcPedido.pedidoCabecera.patchValue({
      idEstadoPedido: value
    })
  }
  cambioCallCenter(value: any) {
    this.flagCallCenter = value
    this.svcPedido.pedidoCabecera.patchValue({
      idCallCenter: value
    })
  }


  //METODOS_PEDIDO_PRODUCTO
  cambioCampana(value: any) {
    this.flagCampana = value
    switch (value) {
      case 1://VODAFONE
        this.colorCampanaFondo = "#f44336"
        this.colorCampanaTexto = "white"
        break
      case 2:
        this.colorCampanaFondo = "#ffdf00"
        this.colorCampanaTexto = "black"
        break
      case 3:
        this.colorCampanaFondo = "#ff4081"
        this.colorCampanaTexto = "white"
        break
    }
    this.svcPedidoCabecera.enviarCampanaFiltro(this.campanas.filter((campana: Campana) => {
      return campana.idCampana == value
    }))
    this.svcPedidoProductos.planesFiltroCampana = this.svcPedidoProductos.planes?.filter((plan: Plan) => {
      return plan.idCampana == value
    })
  }

  agregarProducto() {
    let idMovil = 2
    let idMovilPlus = 3
    if (this.svcPedidoProductos.frmProdLineaMovil.value.length == 0) {
      this.svcPedidoProductos.agregarProductoLineasMovilesAtipico(idMovil);
    } else {
      this.svcPedidoProductos.agregarProductoLineasMovilesAtipico(idMovilPlus);
    }
  }

  onClose() {
    if (this.formularioEnviado == false) {
      this.dialogRef.close(false);
    } else {
      this.dialogRef.close(true);
    }
    this.svcPedido.limpiarFormularioGeneral();
  }

}
