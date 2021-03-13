export class PlanApi {

    [k: string]: string | number

    constructor(
        public IdPlan: number = 0,
        public Plan: string = '',
        public IdCampana: string = '',
        public Campana: string = '',
        public IdTipoProducto: string = '',//linea movil + fibra optica
        public TipoProducto: string = '',
        public Estado: string = ''
    ){

    }
    
}

export class Plan {

    [k: string]: string | number

    constructor(
        public idPlan: number = 0,
        public plan: string = '',
        public idCampana: string | number = '',
        public campana: string = '',
        public idTipoProducto: string | number = '',//linea movil + fibra optica
        public tipoProducto: string = '',
        public estado: string = ''
    ){

    }
    
}


