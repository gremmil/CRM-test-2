export class PedidoListadoApi {

    [k: string]: string | number

    constructor(

        public IdPedido : number = 0,
        public IdCallCenter : number = 0,
        public CallCenter : string = '',
        public IdCampana : number = 0,
        public Campana : string = '',
        public FechaVenta : string = '',
        public NombreCompleto : string = '',
        public NroDocumento : string = '',
        public IdEstadoPedido : number = 0,
        public Estado : string = '',
        public Color : string = '',
        public Producto :string = '',
        public FlagPedidoFirmado: number = 0,
        public UrlImagenFirma: string = '',
        public TokenUrlFirma: string = '',
        public FlagPedidoAtipico: number = 0

    ){

    }

}

export class PedidoListado {

    [k: string]: string | number

    constructor(

        public idPedido : number = 0,
        public idCallCenter : number = 0,
        public callCenter : string = '',
        public idCampana : number = 0,
        public campana : string = '',
        public fechaVenta : string = '',
        public nombreCompleto : string = '',
        public nroDocumento : string = '',
        public idEstadoPedido : number = 0,
        public estado : string = '',
        public color : string = '',
        public producto :string = '',
        public flagPedidoFirmado: number = 0,
        public urlImagenFirma: string = '',
        public tokenUrlFirma: string = '',
        public flagPedidoAtipico: number = 0
    ){

    }

}
