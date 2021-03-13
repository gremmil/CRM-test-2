export class OperadorApi {

    [k: string]: string | number

    constructor(
        public IdOperador : number = 0,
        public Descripcion : string = '',
        public Estado : string = ''
    ){
                
    }

}
export class Operador {

    [k: string]: string | number

    constructor(
        public idOperador : number = 0,
        public descripcion : string = '',
        public estado : string = ''
    ){
                
    }

}
