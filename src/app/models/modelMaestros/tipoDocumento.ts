export class TipoDocumentoApi {

    [k: string]: string | number

    constructor(
        public IdTipoDocumento: number = 0,
        public Descripcion: string = '',
        public Estado: string = ''
    ){

    }
    
}

export class TipoDocumento {

    [k: string]: string | number

    constructor(
        public idTipoDocumento: number = 0,
        public descripcion: string = '',
        public estado: string = ''
    ){

    }
    
}
