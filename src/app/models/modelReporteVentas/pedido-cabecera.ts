export class PedidoCabeceraApi {

    [k: string]: string | number

    constructor(
        public idPedido: number = 0,
        public idCampana: number = 0,
        public nombres: string = '',
        public apellidos: string = '',
    
        public idTipoDocumento: number = 0,
        public nroDocumento: string = '',
        public fechaNacimiento: string = '',
    
        public idEstadoPedido: number = 0,
        public codUsuario: string = '',
        public idCallCenter: string = '',
    ){

        /*"idPedido":140,
        "idCampana":2,
        "nombres":"JOSE MANUEL ",
        "apellidos":"CARROZA TEJADA",
        "idTipoDocumento":1,
        "nroDocumento":"09224884K",
        "fechaNacimiento":"2002-07-27T00:00:00",
        "idProvincia":8,
        "localidad":"MERIDA",
        "nombreVia":" CALLE ANDRES NIETO CARMONA",
        "numero":"11",
        "planta":"2",
        "puerta":"B",
        "escalera":"",
        "codPostal":"06800",
        "contactoMovil":"656752553",
        "contactoOtro":"656752553",
        "correo":"jmcarroza76@hotmail.com",
        "cuentaBancaria":"ES25 2100 5698 9502 0017 6204 ",
        "idEstadoPedido":2,
        "idCallCenter":4*/

    }

    

}

export class PedidoCabecera {

    [k: string]: string | number

    constructor(
        public idPedido: number = 0,
        public idCampana: number = 0,
        public nombres: string = '',
        public apellidos: string = '',
    
        public idTipoDocumento: number = 0,
        public nroDocumento: string = '',
        public fechaNacimiento: string = '',
    
        public idEstadoPedido: number = 0,
        public codUsuario: string = '',
        public idCallCenter: string = '',
    ){

    }



}
