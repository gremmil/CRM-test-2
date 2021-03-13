import {
    Session,
    Callcenter,
    Login,
    EstadoPedido,
    Operador,
    Provincia,
    TipoDocumento,
    TipoProducto,
    TipoPlan,
    TipoUsuario,
    Campana,
    Plan,
    Usuario,
    PedidoCabeceraFormato1,
    PedidoCabeceraFormato2,
    PedidoCabecera,
    PedidoCoste,
    PedidoToken,
    PedidoListado,
    Pedido,
    PedidoArchivo,
    PedidoProducto,
    DesactivarNotificacionComentarioPedido,
    SessionApi
} from '../index'
import { InsertarComentarioPedido, InsertarComentarioPedidoApi } from '../modelComentarios/insertar-comentario-pedido'
import { ListarComentariosPedido, ListarComentariosPedidoApi } from '../modelComentarios/listar-comentarios-pedido'
import { EstadoPedidoApi } from '../modelMaestros/estadoPedido'
import { OperadorApi } from '../modelMaestros/operador'
import { ProvinciaApi } from '../modelMaestros/provincia'
import { TipoDocumentoApi } from '../modelMaestros/tipoDocumento'
import { TipoPlanApi } from '../modelMaestros/tipoPlan'
import { TipoProductoApi } from '../modelMaestros/tipoProducto'
import { TipoUsuarioApi } from '../modelMaestros/tipoUsuario'
import { CallcenterApi } from '../modelMantenimientos/callcenters'
import { CampanaApi } from '../modelMantenimientos/campanas'
import { PlanApi } from '../modelMantenimientos/planes'
import { UsuarioApi } from '../modelMantenimientos/usuarios'
import { DesactivarNotificacionComentarioPedidoApi } from '../modelNotificaciones/desactivar-notificacion-comentario-pedido'
import { ListarNotificacionesComentarioPedido, ListarNotificacionesComentarioPedidoApi } from '../modelNotificaciones/listar-notificaciones-comentario-pedido'
import { NotificacionCantidad, NotificacionCantidadApi, NotificacionComentarioPedido, NotificacionComentarioPedidoApi } from '../modelNotificaciones/notificacion-comentario-pedido'
import { PedidoApi } from '../modelReporteVentas/pedido'
import { PedidoCabeceraApi } from '../modelReporteVentas/pedido-cabecera'
import { PedidoCabeceraFormato1Api } from '../modelReporteVentas/pedido-cabecera-formato-1'
import { PedidoCabeceraFormato2Api } from '../modelReporteVentas/pedido-cabecera-formato-2'
import { PedidoCosteApi } from '../modelReporteVentas/pedido-costes'
import { PedidoListadoApi } from '../modelReporteVentas/pedido-listado'
import { PedidoTokenApi } from '../modelReporteVentas/pedido-token'
import { PedidoArchivoApi } from '../modelReporteVentas/pedidoArchivos'
import { PedidoProductoApi } from '../modelReporteVentas/pedidoProductos'
import { LoginApi } from './login'
import { NotificacionCrud, NotificacionCrudApi } from './notificacion-crud'


export class Apimodel {

    constructor(
        public Error: string = '',
        public Mensaje: string = '',
        public Resultado: any[] | any
    ) { }

    static convertirRespuestaSolicitudApi(objModificar: any, tabla: string, tipoConversion: string) {
        let objModificado: any
        switch (tabla) {
            //GENERALES
            case 'login':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new Login()
                        break
                    case 'solicitud':
                        objModificado = new LoginApi()
                        break
                }
                break
            case 'session':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new Session()
                        break
                    case 'solicitud':
                        objModificado = new SessionApi()
                        break
                }
                break
            case 'notificacioncrud':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new NotificacionCrud()
                        break
                    case 'solicitud':
                        objModificado = new NotificacionCrudApi()
                        break
                }
                break
            //MAESTROS
            case 'callcenterporusuario':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new Callcenter()

                        break
                    case 'solicitud':
                        objModificado = new CallcenterApi()

                        break
                }
                break
            case 'estadopedido':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new EstadoPedido()

                        break
                    case 'solicitud':
                        objModificado = new EstadoPedidoApi()

                        break
                }
                break
            case 'operador':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new Operador()

                        break
                    case 'solicitud':
                        objModificado = new OperadorApi()

                        break
                }
                break
            case 'provincia':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new Provincia()

                        break
                    case 'solicitud':
                        objModificado = new ProvinciaApi()

                        break
                }
                break
            case 'tipodocumento':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new TipoDocumento()

                        break
                    case 'solicitud':
                        objModificado = new TipoDocumentoApi()

                        break
                }
                break
            case 'tipoplan':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new TipoPlan()

                        break
                    case 'solicitud':
                        objModificado = new TipoPlanApi()

                        break
                }
                break
            case 'tipoproducto':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new TipoProducto()

                        break
                    case 'solicitud':
                        objModificado = new TipoProductoApi()

                        break
                }
                break
            case 'tipousuario':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new TipoUsuario()

                        break
                    case 'solicitud':
                        objModificado = new TipoUsuarioApi()

                        break
                }
                break
            //MANTENIMIENTOS
            case 'callcenter':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new Callcenter()

                        break
                    case 'solicitud':
                        objModificado = new CallcenterApi()

                        break
                }
                break
            case 'campana':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new Campana()

                        break
                    case 'solicitud':
                        objModificado = new CampanaApi()

                        break
                }
                break
            case 'plan':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new Plan()

                        break
                    case 'solicitud':
                        objModificado = new PlanApi()

                        break
                }
                break
            case 'usuario':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new Usuario()

                        break
                    case 'solicitud':
                        objModificado = new UsuarioApi()

                        break
                }
                break
            //PEDIDOS
            case 'pedidocabeceraformato1':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new PedidoCabeceraFormato1()

                        break
                    case 'solicitud':
                        objModificado = new PedidoCabeceraFormato1Api()

                        break
                }
                break
            case 'pedidocabeceraformato2':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new PedidoCabeceraFormato2()

                        break
                    case 'solicitud':
                        objModificado = new PedidoCabeceraFormato2Api()

                        break
                }
                break
            case 'pedidocabecera'://FORMATO_1
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new PedidoCabeceraFormato1()

                        break
                    case 'solicitud':
                        objModificado = new PedidoCabeceraFormato1Api()

                        break
                }
                break
            case 'pedidocoste':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new PedidoCoste()

                        break
                    case 'solicitud':
                        objModificado = new PedidoCosteApi()

                        break
                }
                break
            case 'pedidotoken':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new PedidoToken()

                        break
                    case 'solicitud':
                        objModificado = new PedidoTokenApi()

                        break
                }
                break
            case 'pedidolistado':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new PedidoListado()

                        break
                    case 'solicitud':
                        objModificado = new PedidoListadoApi()

                        break
                }
                break
            case 'pedido':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new Pedido()

                        break
                    case 'solicitud':
                        objModificado = new PedidoApi()

                        break
                }
                break
            case 'pedidoarchivo':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new PedidoArchivo()

                        break
                    case 'solicitud':
                        objModificado = new PedidoArchivoApi()

                        break
                }
                break
            case 'pedidoproducto':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new PedidoProducto()

                        break
                    case 'solicitud':
                        objModificado = new PedidoProductoApi()

                        break
                }
                break
            //COMENTARIOS
            case 'listarcomentarios':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new ListarComentariosPedido()

                        break
                    case 'solicitud':
                        objModificado = new ListarComentariosPedidoApi()

                        break
                }
                break
            case 'insertarcomentario':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new InsertarComentarioPedido()

                        break
                    case 'solicitud':
                        objModificado = new InsertarComentarioPedidoApi()

                        break
                }
                break
            //NOTIFICACIONES
            case 'listarnotificaciones':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new ListarNotificacionesComentarioPedido()

                        break
                    case 'solicitud':
                        objModificado = new ListarNotificacionesComentarioPedidoApi()

                        break
                }
                break
            case 'desactivarnotificacion':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new DesactivarNotificacionComentarioPedido()

                        break
                    case 'solicitud':
                        objModificado = new DesactivarNotificacionComentarioPedidoApi()

                        break
                }
                break
            case 'notificacioncomentario':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new NotificacionComentarioPedido()

                        break
                    case 'solicitud':
                        objModificado = new NotificacionComentarioPedidoApi()

                        break
                }
                break
            case 'notificacioncantidad':
                switch (tipoConversion) {
                    case 'respuesta':
                        objModificado = new NotificacionCantidad()

                        break
                    case 'solicitud':
                        objModificado = new NotificacionCantidadApi()

                        break
                }
                break
        }
        let claveObjetoModificar: string[] = Object.keys(objModificar)
        let clavesObjetoModificado: string[] = Object.keys(objModificado)
        claveObjetoModificar.forEach((key, i) => {
            Object.defineProperty(objModificado, clavesObjetoModificado[i], {
                value: objModificar[key]
            });
        })
        return objModificado
    }
}


