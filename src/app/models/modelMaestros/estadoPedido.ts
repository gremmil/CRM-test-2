export class EstadoPedidoApi {

    [k: string]: string | number

    constructor(
        public IdEstadoPedido: number = 0,
        public Descripcion: string = '',
        public Color: string = '',
        public Estado: string = ''
    ){

    }
    
    
}
export class EstadoPedido {

    [k: string]: string | number

    constructor(
        public idEstadoPedido: number = 0,
        public descripcion: string = '',
        public color: string = '',
        public estado: string = ''
    ){

    }
    
    
    
}
