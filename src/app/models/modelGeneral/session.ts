export class SessionApi {
    
    [k: string]: string | number

    constructor(
        public NombreCompleto: string = '',
        public CodUsuario: string = '',
        public IdTipoUsuario: number = 0,
        public TipoUsuario: string = '',
        public IdCallCenter: string = '',
    ){

    }
    
}
export class Session{

    [k: string]: string | number

    constructor(
        public nombreCompleto: string = '',
        public codUsuario: string = '',
        public idTipoUsuario: number = 0,
        public tipoUsuario: string = '',
        public idCallCenter: string = '',
    ){
    }
    
}
