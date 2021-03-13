export class PedidoArchivoApi {

    [k: string]: string | number | ArrayBuffer

    constructor(
        public idPedidoImagen: number = 0,
        public urlImagen: string | ArrayBuffer = '',
        public nombreArchivo: string = '',
        public tipoImagen: string = '',
        //public contenedor: string = ''
    ){

    }


}
export class PedidoArchivo {

    [k: string]: string | number | ArrayBuffer

    constructor(
        public idPedidoArchivo: number = 0,
        public urlArchivo: string | ArrayBuffer = '',
        public nombreArchivo: string = '',
        public tipoArchivo: string = '',
        //public contenedor: string = ''
    ){

    }


}
