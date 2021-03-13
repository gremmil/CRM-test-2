export class PedidoCosteApi {

    [k: string]: string | number

    constructor(
        public costePromocional: string = '',
        public costeReal: string = '',
        public promocionAplicar: string = ''
    ){

    }
}

export class PedidoCoste {

    [k: string]: string | number

    constructor(
        public costePromocional: string = '',
        public costeReal: string = '',
        public promocionAplicar: string = ''
    ){

    }
}
