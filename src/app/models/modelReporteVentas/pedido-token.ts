export class PedidoTokenApi {

    [k: string]: string | number

    constructor(
        public idPedido: number = 0,  
        public idCampana: number = 0,
        
        public campana: string = '',
        public color: string = '',
        public logoCampana: string = '',
     
        public nombreCompleto: string = '',
        public tipoDocumento: string = '',
        public nroDocumento: string = '',
     
        public productoFibra: string = '',
        public productoLineaMovil: string = '',
        public costes: string = '',
     
        public UrlImagenFirma: string = ''
    ){

    }

 
}

export class PedidoToken {

    [k: string]: string | number | string[]

    constructor(
        public idPedido: number = 0,  
        public idCampana: number = 0,
        
        public campana: string = '',
        public color: string = '',
        public logoCampana: string = '',
     
        public nombreCompleto: string = '',
        public tipoDocumento: string = '',
        public nroDocumento: string = '',
     
        public productoFibra: string = '',
        public productoLineaMovil: string = '',
        public costes: string = '',
     
        public urlImagenFirma: string = ''
    ){
    }

    get productoLineaMovilTitulo(){
        return this.productoLineaMovil.split('/').shift()
    }
    get productoLineaMovilDescripcion(){
        let arr = this.productoLineaMovil.split('/')
        arr.shift()
        return arr
    }
    get costesTitulo(){
        return this.costes.split('/')[0]
    }
    get costesDescripcion(){
        return this.costes.split('/')[1]
    }
 
}
