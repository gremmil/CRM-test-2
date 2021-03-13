export class InsertarComentarioPedidoApi {
    [k: string]: string | number

    constructor(
        public idPedido : number = 0,
        public comentario : string = '',
        public idTipoUsuario : number = 0,
        public codUsuario: string = ''
    ){
    }
}

export class InsertarComentarioPedido {
    [k: string]: string | number

    constructor(
        public idPedido : number = 0,
        public comentario : string = '',
        public idTipoUsuario : number = 0,
        public codUsuario: string = ''
    ){
    }
}