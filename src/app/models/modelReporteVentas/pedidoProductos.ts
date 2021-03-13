export class PedidoProductoApi {

    [k: string]: string | number

    constructor(
        public idPedidoProducto: number = 0,
        public idTipoProducto: number = 0,
        public idPlan: number = 0,

        public flagPortabilidad: string = '',
        public idOperador: number = 0,
        public numeroFijo: string = '',
        public flagMismoTitular: string = '',

        public idTipoDocumento: number = 0,
        public nroDocumento: string = '',
        public nombresTitular: string = '',
        public apellidosTitular: string = '',

        public idTipoPlan: number = 0,
        public numeroICC: string = '',
        public flagConTV: string = '',
        public idsPaquetesTV: string = '',
        public flagDeco: string = ''
    ){

    }
    
}

export class PedidoProducto {

    [k: string]: string | number

    constructor(
        public idPedidoProducto: number = 0,
        public idTipoProducto: number = 0,
        public idPlan: number = 0,

        public flagPortabilidad: string = '',
        public idOperador: number = 0,
        public numeroFijo: string = '',
        public flagMismoTitular: string = '',

        public idTipoDocumento: number = 0,
        public nroDocumento: string = '',
        public nombresTitular: string = '',
        public apellidosTitular: string = '',

        public idTipoPlan: number = 0,
        public numeroICC: string = '',
        public flagConTV: string = '',
        public idsPaquetesTV: string = '',
        public flagDeco: string = ''
    ){

    }

}