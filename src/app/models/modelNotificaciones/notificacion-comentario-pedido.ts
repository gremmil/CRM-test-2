export class NotificacionComentarioPedidoApi {

    [k: string]: string | number

    constructor(
        public IdPedido : number = 0,
        public Notificacion : string = ''
    ){}
}

export class NotificacionComentarioPedido {

    [k: string]: string | number

    constructor(
        public idPedido : number = 0,
        public notificacion : string = ''
    ){}

    get notificacionNombreDocumento(){
        return `${this.notificacion.split(',')[0]}`
    }
    get notificacionDescripcion(){
        return `${this.notificacion.split(',')[1]}`

    }
}

//AUXILIARES
export class NotificacionCantidadApi {

    [k: string]: string | number

    constructor(
        public Count : number = 0,
    ){}
}

export class NotificacionCantidad {

    [k: string]: string | number

    constructor(
        public cantidad : number = 0,
    ){}
}

