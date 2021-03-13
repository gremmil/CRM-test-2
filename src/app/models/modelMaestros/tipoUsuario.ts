export class TipoUsuarioApi {

    [k: string]: string | number

    constructor(
        public IdTipoUsuario: number = 0,
        public Descripcion: string = '',
        public Estado: string = ''
    ){

    }
    
}

export class TipoUsuario {

    [k: string]: string | number

    constructor(
        public idTipoUsuario: number = 0,
        public descripcion: string = '',
        public estado: string = ''
    ){

    }
    
}
