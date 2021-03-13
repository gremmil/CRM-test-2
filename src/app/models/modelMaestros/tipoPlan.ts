export class TipoPlanApi {

    [k: string]: string | number

    constructor(
        public IdTipoPlan : number = 0,
        public Descripcion : string = '',
        public Estado : string = ''
    ){

    }
    
}

export class TipoPlan {

    [k: string]: string | number

    constructor(
        public idTipoPlan : number = 0,
        public descripcion : string = '',
        public estado : string = ''
    ){

    }
    
}
