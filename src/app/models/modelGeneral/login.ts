export class LoginApi {

    [k: string]: string | number

    constructor(
         public CodUsuario: string = '',
         public Contrasena: string = ''
    ){}
}

export class Login {

    [k: string]: string | number

    constructor(
         public codUsuario: string = '',
         public contrasena: string = ''
    ){}
}
