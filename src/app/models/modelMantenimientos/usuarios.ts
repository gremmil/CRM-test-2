export class UsuarioApi {

    [k: string]: string | number

    constructor(
        public IdUsuario: number = 0,
        public Nombre: string = '',
        public Apellido: string = '',
        public IdCallCenter: string = '',
        public CallCenter: string = '',
        public IdTipoUsuario: number = 0,
        public TipoUsuario: string = '',
        public User: string = '',
        public Contrasena: string = '',
        public Estado: string = ''
    ){}

    
}

export class Usuario {

    [k: string]: string | number

    constructor(
        public idUsuario: number = 0,
        public nombre: string = '',
        public apellido: string = '',
        public idCallCenter: string = '',
        public callCenter: string = '',
        public idTipoUsuario: string = '',
        public tipoUsuario: string = '',
        public usuario: string = '',
        public contrasena: string = '',
        public estado: string = ''
    ){}

    
}
