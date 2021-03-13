import {PedidoCabecera, PedidoCabeceraApi} from './pedido-cabecera'

export class PedidoCabeceraFormato2Api extends PedidoCabeceraApi {

    [k: string]: string | number

    constructor(
        public lugarNacimiento: string = '',
        public nroDepartamentoCasa: string = '',
        public idProvincia: number = 0,
        public idDepartamento: number = 0,
        public idDistrito: number = 0,
        public plano: string = '',
        public referencias: string = '',
        public nombrePadre: string = '',
        public nombreMadre: string = ''
    ){
        super();
    }
    
}

export class PedidoCabeceraFormato2 extends PedidoCabecera {

    [k: string]: string | number

    constructor(
        public lugarNacimiento: string = '',
        public nroDepartamentoCasa: string = '',
        public idProvincia: number = 0,
        public idDepartamento: number = 0,
        public idDistrito: number = 0,
        public plano: string = '',
        public referencias: string = '',
        public nombrePadre: string = '',
        public nombreMadre: string = ''
    ){
        super();
    }
    
}
