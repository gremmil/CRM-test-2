export class TipoProductoApi {

    [k: string]: string | number

    constructor(
        public IdTipoProducto: number = 0,
        public Descripcion: string = '',
        public Estado: string = '',
    ){

    }
     
}

export class TipoProducto {

    [k: string]: string | number

    constructor(
        public idTipoProducto: number = 0,
        public descripcion: string = '',
        public estado: string = '',
    ){

    }
     
}
