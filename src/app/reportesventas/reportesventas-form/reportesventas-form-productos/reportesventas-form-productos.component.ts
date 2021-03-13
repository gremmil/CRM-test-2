import { Component, OnInit } from '@angular/core';
import { ListarOperadorService } from 'src/app/shared/svcMaestros/listar-operador.service';
import { ListarTipoPlanService } from 'src/app/shared/svcMaestros/listar-tipo-plan.service';
import { TipoProductoService } from 'src/app/shared/svcMaestros/tipo-producto.service';
import { PedidoProductosService } from 'src/app/shared/svcPedidos/pedido-productos.service';
import { PedidoService } from 'src/app/shared/svcPedidos/pedido.service';
import { Observable } from 'rxjs';
import { TipoDocumentoService } from 'src/app/shared/svcMaestros/tipo-documento.service';

@Component({
  selector: 'app-reportesventas-form-productos',
  templateUrl: './reportesventas-form-productos.component.html',
  styleUrls: ['./reportesventas-form-productos.component.css']
})
export class ReportesventasFormProductosComponent implements OnInit {

  tiposProductos$: Observable<any> = this.svcTipoProducto.listarRegistros()
  tiposPlanes$: Observable<any> = this.svcTipoPlan.listarRegistros()
  operadores$: Observable<any> = this.svcOperador.listarRegistros()
  tiposDocumentos$: Observable<any> = this.svcTipoDocumento.listarRegistros()

  constructor(
    public svcPedido :  PedidoService,
    public svcPedidoProductos: PedidoProductosService,
    private svcTipoProducto: TipoProductoService,
    private svcTipoDocumento: TipoDocumentoService,
    private svcTipoPlan: ListarTipoPlanService,
    private svcOperador: ListarOperadorService,
  ) { }

  ngOnInit(): void {
  
  }


  agregarProducto() {
    let idMovil=2
    let idMovilPlus=3
    if(this.svcPedidoProductos.frmProdLineaMovil.value.length==0){
      this.svcPedidoProductos.agregarProductoLineasMoviles(idMovil);
    }else{
      this.svcPedidoProductos.agregarProductoLineasMoviles(idMovilPlus);
    }
  }
  
}
