import {PedidoCabecera, PedidoCabeceraApi} from './pedido-cabecera'

export class PedidoCabeceraFormato1Api {

    [k: string]: string | number

    constructor(
        public idPedido: number = 0,
        public idCampana: number = 0,
        public nombres: string = '',
        public apellidos: string = '',
    
        public idTipoDocumento: number = 0,
        public nroDocumento: string = '',
        public fechaNacimiento: string = '',

        public idProvincia: number = 0,
        public localidad: string = '',
        public nombreVia: string = '',
        public numero: string = '',
    
        public planta: string = '',
        public puerta: string = '',
        public escalera: string = '',
        public codPostal: string = '',
        
        public contactoMovil: string = '',
        public contactoOtro: string = '',
        public correo: string = '',
        public cuentaBancaria: string = '',

        public idEstadoPedido: number = 0,
        public codUsuario: string = '',
        public idCallCenter: string = '',
        public flagPedidoAtipico: number = 0
    ){
        //super();
    }
    

}

export class PedidoCabeceraFormato1 {

    [k: string]: string | number

    constructor(
        public idPedido: number = 0,
        public idCampana: number = 0,
        public nombres: string = '',
        public apellidos: string = '',
    
        public idTipoDocumento: number = 0,
        public nroDocumento: string = '',
        public fechaNacimiento: string = '',

        public idProvincia: number = 0,
        public localidad: string = '',
        public nombreVia: string = '',
        public numero: string = '',
    
        public planta: string = '',
        public puerta: string = '',
        public escalera: string = '',
        public codPostal: string = '',
        
        public contactoMovil: string = '',
        public contactoOtro: string = '',
        public correo: string = '',
        public cuentaBancaria: string = '',

        public idEstadoPedido: number = 0,
        public codUsuario: string = '',
        public idCallCenter: string = '',
        public flagPedidoAtipico: number = 0
    ){
        //super();
    }

    

}

