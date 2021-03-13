import { PedidoCabecera, PedidoCabeceraApi } from "./pedido-cabecera"
import { PedidoArchivoApi, PedidoArchivo } from "./pedidoArchivos"
import { PedidoProductoApi, PedidoProducto} from './pedidoProductos'
import { PedidoCosteApi, PedidoCoste } from './pedido-costes'
import { PedidoCabeceraFormato1, PedidoCabeceraFormato1Api } from './pedido-cabecera-formato-1'

export class PedidoApi {

    [k: string]: string | number | Array<PedidoCabeceraFormato1Api | PedidoArchivoApi | PedidoProductoApi | PedidoCosteApi>

    constructor(
        public pedido: PedidoCabeceraFormato1Api[] = [],
        public pedidoImagen: PedidoArchivoApi[] = [],
        public pedidoProducto: PedidoProductoApi[] = [],
        public pedidoCoste: PedidoCosteApi[] = []
    ){}  
}

export class Pedido {

    [k: string]: string | number | Array<PedidoCabeceraFormato1 | PedidoArchivo | PedidoProducto | PedidoCoste>

    constructor(
        public pedidoCabecera: PedidoCabeceraFormato1[] = [],
        public pedidoArchivos: PedidoArchivo[] = [],
        public pedidoProductos: PedidoProducto[] = [],
        public pedidoCostes: PedidoCoste[] = []
    ){}
}
