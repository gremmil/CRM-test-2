export class ListarComentariosPedidoApi {
    [k: string]: string | number

    constructor(
        public IdPedido : number = 0,
        public NombreCompleto : string = '',
        public FechaComentario : string = '',
        public Comentarios : string = '',
        public IdTipoUsuario : number = 0
    ){
    }
}

export class ListarComentariosPedido {
    [k: string]: string | number

    constructor(
        public idPedido : number = 0,
        public nombreCompleto : string = '',
        public fechaComentario : string = '',
        public comentarios : string = '',
        public idTipoUsuario : number = 0
    ){
    }
}
