export class CallcenterPorUsuarioApi {

    [k: string]: string | number

    constructor(
        public IdCallCenter : number = 0,
        public Descripcion : string = '',
        public Estado : string = ''
    ){}

    
}

export class CallcenterPorUsuario {

    [k: string]: string | number

    constructor(
        public idCallCenter : number = 0,
        public descripcion : string = '',
        public estado : string = ''
    ){}

    
}
