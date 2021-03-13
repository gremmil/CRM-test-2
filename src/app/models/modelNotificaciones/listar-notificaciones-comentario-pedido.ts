import { NotificacionComentarioPedidoApi, NotificacionCantidadApi, NotificacionComentarioPedido, NotificacionCantidad } from "./notificacion-comentario-pedido";

export class ListarNotificacionesComentarioPedidoApi {
    [k: string]: string | number | Array<NotificacionCantidadApi | NotificacionComentarioPedidoApi>

    constructor(
        public cantidad : NotificacionCantidadApi[] = [],
        public Notificaciones : NotificacionComentarioPedidoApi[] = []
    ){
    }
    
}

export class ListarNotificacionesComentarioPedido {
    [k: string]: string | number | Array<NotificacionCantidad | NotificacionComentarioPedido>

    constructor(
        public cantidad : NotificacionCantidad[] = [],
        public notificaciones : NotificacionComentarioPedido[] = []
    ){
    }
    
}
