export class CallcenterApi {

    [k: string]: string | number

    constructor(
        public IdCallCenter: number = 0,
        public Descripcion: string = '',
        public Estado: string = ''
    ){}
    
    
}

export class Callcenter {

    [k: string]: string | number

    constructor(
        public idCallCenter: number = 0,
        public descripcion: string = '',
        public estado: string = ''
    ){}
    
    
}
