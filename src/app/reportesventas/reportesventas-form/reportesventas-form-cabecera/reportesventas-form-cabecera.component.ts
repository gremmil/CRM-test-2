import { Component, OnInit } from '@angular/core';
import { ListarProvinciaService } from 'src/app/shared/svcMaestros/listar-provincia.service';
import { TipoDocumentoService } from 'src/app/shared/svcMaestros/tipo-documento.service';
import { PedidoCabeceraService } from 'src/app/shared/svcPedidos/pedido-cabecera.service';
import { PedidoService } from 'src/app/shared/svcPedidos/pedido.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reportesventas-form-cabecera',
  templateUrl: './reportesventas-form-cabecera.component.html',
  styleUrls: ['./reportesventas-form-cabecera.component.css']
})
export class ReportesventasFormCabeceraComponent implements OnInit {

  tiposDocumentos$: Observable<any> = this.svcTipoDocumento.listarRegistros()
  provincias$: Observable<any> = this.svcProvincia.listarRegistros()

  constructor(
    public svcPedidoCabecera: PedidoCabeceraService,
    public svcPedido: PedidoService,
    private svcTipoDocumento: TipoDocumentoService,
    private svcProvincia: ListarProvinciaService,
  ) { }

  ngOnInit(): void {
    this.svcPedidoCabecera.habilitarCampos()
  }

}
