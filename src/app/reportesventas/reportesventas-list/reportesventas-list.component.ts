import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

//MODELOS
import { PedidoListado } from '../../models/modelReporteVentas/pedido-listado'
//SERVICIOS
import { EstadoPedidoService } from '../../shared/svcMaestros/estado-pedido.service';
import { CampanasService } from '../../shared/svcMantenimientos/campanas.service';
import { LoginService } from '../../shared/svcGeneral/login.service';
import { PedidoService } from '../../shared/svcPedidos/pedido.service';
import { ComentariosPedidosService } from 'src/app/shared/svcComentarios/comentarios-pedidos.service';
import { NotificacionesComentariosPedidosService } from '../../shared/svcNotificaciones/notificaciones-comentarios-pedidos.service';
import { NotificacionesFirmasPedidosService } from 'src/app/shared/svcNotificaciones/notificaciones-firmas-pedidos.service';

import { NotificationService } from 'src/app/shared/svcCustom/notification.service';
//COMPONENTES
import { ReportesventasFormComponent } from '../reportesventas-form/reportesventas-form.component';
import { ComentariosComponent } from '../comentarios/comentarios.component'
//MATERIAL
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { Observable, Subscription } from 'rxjs';
//ANIMACIONES
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DialogService } from '../../shared/svcCustom/dialog.service';
//EXTRAS
import { ListarCallCenterPorUsuarioService } from 'src/app/shared/svcMaestros/listar-call-center-por-usuario.service';
import { ReportesventasFormFirmasComponent } from '../reportesventas-form-atipico/reportesventas-form-atipico.component';
import { environment } from 'src/environments/environment';
import { Apimodel } from 'src/app/models/modelGeneral/apimodel';
import { ExportacionArchivosService } from 'src/app/shared/svcCustom/exportacion-archivos.service';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-reportesventas-list',
  templateUrl: './reportesventas-list.component.html',
  styleUrls: ['./reportesventas-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ReportesventasListComponent implements OnInit, OnDestroy {

  dataSource!: MatTableDataSource<PedidoListado>;
  displayedColumns: string[] = ['idPedido', 'fechaVenta', 'nombreCompleto', 'nroDocumento', 'estado', 'producto', 'callCenter', 'campana', 'acciones', 'acciones2'];
  contadorPedidos!: number


  flagNotificacionAbierta = false
  elementIdPedido: any = null
  //ASINCRONICOS
  callcenters$: Observable<any> = this.svcCallCenterPorUsuario.listarRegistros()
  campanas$: Observable<any> = this.svcCampana.listarRegistros()
  estadoPedido$: Observable<any> = this.svcEstadoPedido.listarRegistros()
  //SUSBSCRIPCIONES
  notificacionesComentarios$!: Subscription
  notificacionesFirmas$!: Subscription
  cambiosFormulario$!: Subscription
  dialogRef$!: Subscription

  rowSeleccionado!: number
  filtroPedidos: PedidoListado[]
  mensajeData!: string

  columnas = [
    { titulo: 'N°', definicion: 'idPedido' },
    { titulo: 'Fecha de Venta', definicion: 'fechaVenta' },
    { titulo: 'Cliente', definicion: 'nombreCompleto' },
    { titulo: 'DNI/CIF', definicion: 'nroDocumento' },
    { titulo: 'Estado', definicion: 'estado' },
    { titulo: 'Producto', definicion: 'producto' },
    { titulo: 'Call Center', definicion: 'callCenter' },
    { titulo: 'Campaña', definicion: 'campana' }
  ];

  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  flagChat: number = 0

  constructor(
    public svcPedido: PedidoService,
    private svcEstadoPedido: EstadoPedidoService,

    private svcCampana: CampanasService,
    private svcCallCenterPorUsuario: ListarCallCenterPorUsuarioService,
    public svcLogin: LoginService,
    public svcComentarios: ComentariosPedidosService,
    private svcNotificacionesComentarios: NotificacionesComentariosPedidosService,
    private svcNotificacionesFirmas: NotificacionesFirmasPedidosService,

    public dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    private svcExportarArchivos: ExportacionArchivosService

  ) { }
  ngOnDestroy(): void {
    this.notificacionesComentarios$.unsubscribe()
    this.notificacionesFirmas$.unsubscribe()
    this.cambiosFormulario$.unsubscribe()
  }
  ngOnInit(): void {
    this.svcNotificacionesFirmas.enviarIdPedidoSubject.observers = []
    //LISTADO DE PEDIDOS
    this.svcPedido.listarRegistros().subscribe(
      (data: Apimodel) => {
        if (data.Error == "200") {
          this.filtroPedidos = data.Resultado
          this.contadorPedidos = data.Resultado.length
          this.dataSource = new MatTableDataSource(data.Resultado);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

          this.dataSource.filterPredicate = this.getFilterPredicate();
        } else {
          this.dataSource = new MatTableDataSource();
          this.mensajeData = data.Mensaje
        }
      },
      (error:any) => console.error(error)
    )
    //SUBSCRIPCION DE LAS NOTIFICACIONES-COMENTARIOS-PEDIDOS
    this.notificacionesComentarios$ = this.svcNotificacionesComentarios.enviarIdPedidoObservable
      .pipe(
        mergeMap((idPedido : number)=>this.svcNotificacionesComentarios.desactivarRegistro(idPedido)
          .pipe(
            map(()=>{
              return {idPedido}
            })
          ))
      ).subscribe(
        data =>{
          this.svcPedido.listarRegistros().subscribe(
            (registros:Apimodel)=>{
              {
                if(registros.Error=="200"){
                  this.filtroPedidos = registros.Resultado
                  let pedido = this.filtroPedidos.filter((element: PedidoListado) => element.idPedido == data.idPedido)
                  this.dataSource.data = pedido
      
                  this.dialog.closeAll()
                  this.contadorPedidos = 1
                  this.abrirChat(data.idPedido, true)
                } else {
                  this.dataSource = new MatTableDataSource();
                  this.mensajeData = registros.Mensaje
                }
              }
            }
          )
        } 
      )
    //SUBSCRIPCION DE LAS NOTIFICACIONES-FIRMAS-PEDIDOS
    this.notificacionesFirmas$ = this.svcNotificacionesFirmas.enviarIdPedidoObservable
      .pipe(
        mergeMap((idPedido : number) => this.svcNotificacionesFirmas.desactivarRegistro(idPedido)
          .pipe(
            map(() => {
              return { idPedido }
            })
          ))
      ).subscribe(
        data => {
          this.svcPedido.listarRegistros().subscribe(
            (registros: Apimodel) =>{
              if (registros.Error == "200") {  
                this.filtroPedidos = registros.Resultado
                let pedido = this.filtroPedidos.filter((element: PedidoListado) => element.idPedido == data.idPedido)
    
                this.dataSource.data = pedido
                this.elementIdPedido = pedido[0].idPedido
                
                this.contadorPedidos = 1
                this.flagNotificacionAbierta = true
      
              } else {
                this.dataSource = new MatTableDataSource();
                this.mensajeData = registros.Mensaje
              }
            }
          )
        }
      )

    //CAMBIOS EN EL FORMULARIO DE FILTROS
    this.cambiosFormulario$ = this.svcPedido.formFiltros.valueChanges.subscribe((val: any) => {
      this.elementIdPedido = null
      this.contadorPedidos = 0
      const nroDocumento = val.nroDocumento
      const estadoPedido = val.estado
      const campana = val.campana
      const callCenter = val.callCenter
      const flagPedidoFirmado = val.flagPedidoFirmado
      const flagPedidoAtipico = val.flagPedidoAtipico
      // create string of our searching values and split if by '$'
      const filterValue = nroDocumento + '$' + estadoPedido + '$' + campana + '$' + callCenter + '$' + flagPedidoFirmado + '$' + flagPedidoAtipico;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      /*if (estadoFirma != '') {
        let dataSourceFilter = this.dataSource.data
        switch (estadoFirma) {
          case '0':
            this.dataSource = new MatTableDataSource(dataSourceFilter.filter(elem => elem.urlImagenFirma != ''))
            this.contadorPedidos = this.dataSource.data.length
            break;
          case '1':
            this.dataSource = new MatTableDataSource(dataSourceFilter.filter(elem => elem.urlImagenFirma == ''))
            this.contadorPedidos = this.dataSource.data.length
            break;
        }
      }*/
    })
    //CONFIGURACION DEL PAGINATOR DEL MAT TABLE
    this.paginator._intl.firstPageLabel = 'Primera página';
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.lastPageLabel = 'Ultima página';
    this.paginator._intl.nextPageLabel = 'Página siguiente';
    this.paginator._intl.previousPageLabel = 'Página anterior';
  }
  actualizarComponente() {
    this.elementIdPedido = null
    this.flagNotificacionAbierta = false
    this.ngOnInit()
    this.svcPedido.formFiltros.reset()
    this.svcPedido.formFiltros.setValue({
      nroDocumento: '',
      estado: '',
      callCenter: '',
      campana: '',
      flagPedidoFirmado: '',
      flagPedidoAtipico: ''
    })
  }
  listarPedidos(){
    
  }
  //METODOS CRUD
  crearPedido(tipoPedido: number) {
    this.svcPedido.limpiarFormularioGeneral();
    this.abrirFormularioPedido(false, 0, tipoPedido)
  }
  editarPedido(row: PedidoListado) {
    this.svcPedido.limpiarFormularioGeneral()
    this.abrirFormularioPedido(true, row.idPedido, row.flagPedidoAtipico)
  }
  eliminarPedido(id: number) {
    this.dialogService.openConfirmDialog('¿Estás seguro de eliminar este registro?: Pedido N° ' + id)
      .afterClosed().subscribe((res: Apimodel) => {
        if (res) {
          this.svcPedido.eliminarPedido(id).subscribe(
            (res: any) => {
              if (res.Error == '200') {
                this.notificationService.success(res.Resultado[0].respuesta)
                this.ngOnInit()
              } else {
                this.notificationService.warn(res.Mensaje)
              }
            });
        }
      });
  }
  abrirFormularioPedido(accionEdicion: boolean, idPedido: number, tipoPedido: number) {
    if(tipoPedido==0){//PedidoNormal
      const dialogRef = this.dialog.open(ReportesventasFormComponent, {
        autoFocus: true,
        disableClose: true,
        data: { edicion: accionEdicion, idPedido: idPedido },
        panelClass: 'dialog-form-pedidos'
      });
      dialogRef.afterClosed().subscribe(value => {
        if (value == true) {
          this.actualizarComponente()
        }
      })
    }else{//PedidoAtipico
      const dialogRef = this.dialog.open(ReportesventasFormFirmasComponent, {
        autoFocus: true,
        disableClose: true,
        data: { edicion: accionEdicion, idPedido: idPedido },
        panelClass: 'dialog-form-pedidos-atipicos'
      });
      dialogRef.afterClosed().subscribe(value => {
        if (value == true) {
          this.actualizarComponente()
        }
      })
    }
  }
  //METODOS DEL FORMULARIO DE FILTROS
  limpiarBuscadorTexto() {
    this.svcPedido.formFiltros.get('nroDocumento')?.patchValue('')
  }
  getFilterPredicate() {
    return (row: PedidoListado, filters: string) => {
      // split string per '$' to array
      const filterArray = filters.split('$');
      const nroDocumento = filterArray[0];
      const estadoPedido = filterArray[1];
      const campana = filterArray[2];
      const callCenter = filterArray[3];
      const flagPedidoFirmado = filterArray[4];
      const flagPedidoAtipico = filterArray[5];


      const matchFilter = [];

      // Fetch data from row
      const columnNroDocumento = row.nroDocumento.toLocaleString();
      const columnEstadoPedido = row.estado.toLocaleString();
      const columnCampana = row.campana.toLocaleString();
      const columnCallCenter = row.callCenter.toLocaleString();
      const columnFlagPedidoFirmado = row.flagPedidoFirmado.toLocaleString();
      const columnFlagPedidoAtipico = row.flagPedidoAtipico.toLocaleString();



      // verify fetching data by our searching values
      const customFilterDD = columnNroDocumento.toLowerCase().toLowerCase().includes(nroDocumento);
      const customFilterDS = columnEstadoPedido.toLowerCase().includes(estadoPedido);
      const customFilterAS = columnCampana.toLowerCase().includes(campana);
      const customFilterBS = columnCallCenter.toLowerCase().includes(callCenter);
      const customFilterCS = columnFlagPedidoFirmado.toLowerCase().includes(flagPedidoFirmado);
      const customFilterES = columnFlagPedidoAtipico.toLowerCase().includes(flagPedidoAtipico);




      // push boolean values into array
      matchFilter.push(customFilterDD);
      matchFilter.push(customFilterDS);
      matchFilter.push(customFilterAS);
      matchFilter.push(customFilterBS);
      matchFilter.push(customFilterCS);
      matchFilter.push(customFilterES);

      if (matchFilter.every(Boolean)) {
        this.contadorPedidos++
      }
      // return true if all values in array is true
      // else return false
      return matchFilter.every(Boolean);
    };
  }
  getColor(idEstadoPedido: any) {
    switch (idEstadoPedido) {
      case 1:
        return ''
      case 2:
        return '#ffe60c'
      case 3:
        return '#68ff66'
      case 4:
        return '#ff6666'
      case 5:
        return '#a0a0a0'
      case 6:
        return '#ffb84b'
    }
  }
  //METODOS DE LAS ACCIONES DE LA TABLA
  abrirPedidoComentarios(row: PedidoListado) {
    /*this.svcPedido.formFiltros.patchValue({
      nroDocumento: row.nroDocumento,
      estado: row.estado,
      campana: row.campana,
      callCenter: row.callCenter
    })*/
    if (this.flagChat == 0) {
      this.abrirChat(row.idPedido, false)
      this.flagChat++
    } else {
      this.dialog.closeAll()
      this.abrirChat(row.idPedido, false)
    }


  }
  abrirChat(id: number, esNotificacion: boolean) {
    this.dialogRef$?.unsubscribe()
    this.rowSeleccionado = id
    const dialogRef = this.dialog.open(ComentariosComponent, {
      autoFocus: false,
      disableClose: false,
      height: 'content',
      panelClass: 'dialog-chat',
      hasBackdrop: false,
      data: { idPedido: id, notificacion: esNotificacion }
    });
    dialogRef.updatePosition(
      {
        bottom: '0',
        right: '0'
      }
    )
    this.dialogRef$ = dialogRef.afterClosed().subscribe(value => {
      if (value == true) {
      this.actualizarComponente()      
      }
      this.rowSeleccionado = 0
      this.flagChat--
    })
  }
  //METODOS PARA IMPORTAR EL EXCEL DE LA TABLA
  fileName = 'ReportePedidos.xlsx';
  exportexcel(accion: string): void {
    let dataTable: PedidoListado[] = []
    /*const propiedadesEliminar: string [] = 
    ['idCallCenter', 'idCampana', 'idEstadoPedido', 
    'flagPedidoFirmado', 'urlImagenFirma', 'tokenUrlFirma', 'flagPedidoAtipico', 'color']*/

    switch(accion){
      case 'todo':
        dataTable = this.dataSource.data
      break;
      case 'filtro':
        dataTable = this.dataSource.filteredData
      break;
    }
  

    const dataTableModificada = dataTable.map(fila=>{
      let objModificado= {
        Numero: '',
        FechaVenta: '',
        Cliente: '',
        DNI_CIF: '',
        Estado: '',
        Producto: '',
        CallCenter: '',
        Campaña: '' 
      }
      let claveObjetoModificar: string[] = 
      ['idPedido', 'fechaVenta', 'nombreCompleto', 'nroDocumento',
       'estado', 'producto', 'callCenter', 'campana']

      let clavesObjetoModificado: string[] = Object.keys(objModificado)

        claveObjetoModificar.forEach((key, i) => {
            Object.defineProperty(objModificado, clavesObjetoModificado[i], {
                value: fila[key]
            });
        })
        return objModificado
    })
    this.svcExportarArchivos.exportarExcel(dataTableModificada, this.fileName)

  }
  eliminarFirma(row: PedidoListado) {
    this.dialogService.openConfirmDialog(
      '¿Estás seguro de actualizar la firma de este registro?: Pedido N° ' + row.idPedido
      ).afterClosed().subscribe((res : Apimodel) => {
        if (res) {
          this.svcPedido.actualizarFirmaPedido(row.idPedido, '').subscribe(//CORREGIR ESTA PARTE
            (res: any) => {
              if (res.Error == '200') {
                this.notificationService.success(res.Resultado[0].respuesta)
                this.abrirFirmaPedido(row)
                this.ngOnInit()
              } else {
                this.notificationService.warn(res.Mensaje)
              }
            });
        }
      });
  }
  obtenerUrlFirma(element: PedidoListado) {
    return environment.urlGeneral+'firmas/'+element.tokenUrlFirma
  }
  abrirFirmaPedido(element: PedidoListado){
    if(this.elementIdPedido == element.idPedido){
      this.elementIdPedido = null
    }else{
      this.elementIdPedido = element.idPedido
      this.svcNotificacionesFirmas.desactivarRegistro(element.idPedido).subscribe(val=>{})

    }
    if(this.flagNotificacionAbierta == true){
      this.actualizarComponente()
    }
  }
}
