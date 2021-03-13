import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import { CallcentersService} from './svcMantenimientos/callcenters.service';
import { PlanesService} from './svcMantenimientos/planes.service';
import { UsuariosService} from './svcMantenimientos/usuarios.service';
import { CampanasService } from './svcMantenimientos/campanas.service';
import { EstadoPedidoService } from './svcMaestros/estado-pedido.service';
import { TipoDocumentoService } from './svcMaestros/tipo-documento.service';
import { TipoProductoService } from './svcMaestros/tipo-producto.service';
import { TipoUsuarioService } from './svcMaestros/tipo-usuario.service';
import { LoginService } from './svcGeneral/login.service';
import { DialogService } from './svcCustom/dialog.service';

import { PedidoService } from './svcPedidos/pedido.service';
import { PedidoCabeceraService } from './svcPedidos/pedido-cabecera.service';
import { PedidoArchivosService } from './svcPedidos/pedido-archivos.service';
import { PedidoProductosService } from './svcPedidos/pedido-productos.service';
import { PedidoCostesService } from './svcPedidos/pedido-costes.service';
import { PedidoAtipicosService } from './svcPedidos/pedido-atipicos.service';
import { PedidoFirmasService } from './svcPedidos/pedido-firmas.service'


import { ListarOperadorService} from './svcMaestros/listar-operador.service';
import { ListarProvinciaService} from './svcMaestros/listar-provincia.service';
import { ListarTipoPlanService} from './svcMaestros/listar-tipo-plan.service';
import { ListarCallCenterPorUsuarioService} from './svcMaestros/listar-call-center-por-usuario.service';

import { MantenimientosService } from './svcMantenimientos/mantenimientos.service'

import { ComentariosPedidosService } from './svcComentarios/comentarios-pedidos.service'
import { NotificacionesComentariosPedidosService } from './svcNotificaciones/notificaciones-comentarios-pedidos.service'

//import { CallcenterService} from './callcenter.service';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
   ],
  providers: [ 
    MenuItems,
    CallcentersService,
    CampanasService,
    PlanesService,
    UsuariosService,
    EstadoPedidoService,
    TipoDocumentoService,
    TipoProductoService,
    TipoUsuarioService,
    LoginService,
    PedidoService,
    PedidoCabeceraService,
    PedidoArchivosService,
    PedidoProductosService,
    PedidoCostesService,
    PedidoAtipicosService,
    PedidoFirmasService,
    ListarOperadorService,
    ListarProvinciaService,
    ListarTipoPlanService,
    ListarCallCenterPorUsuarioService,
    MantenimientosService,
    ComentariosPedidosService,
    NotificacionesComentariosPedidosService,
    DialogService
  ]
})
export class SharedModule { }
