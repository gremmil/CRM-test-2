import { Component, OnInit } from '@angular/core';
import { PedidoCostesService } from 'src/app/shared/svcPedidos/pedido-costes.service';
import { PedidoService } from 'src/app/shared/svcPedidos/pedido.service';

@Component({
  selector: 'app-reportesventas-form-costes',
  templateUrl: './reportesventas-form-costes.component.html',
  styleUrls: ['./reportesventas-form-costes.component.css']
})
export class ReportesventasFormCostesComponent implements OnInit {

  constructor(
    public svcPedido: PedidoService,
    public svcPedidoCostes: PedidoCostesService
  ) { }

  ngOnInit(): void {
    this.svcPedidoCostes.habilitarCampos()
  }

}
