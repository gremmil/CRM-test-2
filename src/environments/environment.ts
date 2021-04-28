import { HttpHeaders } from "@angular/common/http"

export const environment = {
  production: false,
  Maestros: {
    TiposUsuario: 'https://utp-wscrmsip.azurewebsites.net/api/Maestros/ListarTipoUsuario',
    TiposProducto: 'https://utp-wscrmsip.azurewebsites.net/api/Maestros/ListarTipoProducto',
    TiposDocumentos: 'https://utp-wscrmsip.azurewebsites.net/api/Maestros/ListarTipoDocumento',
    EstadoPedidos: 'https://utp-wscrmsip.azurewebsites.net/api/Maestros/ListarEstadoPedido',
    ListarProvincia: 'https://utp-wscrmsip.azurewebsites.net/api/Maestros/ListarProvincia',
    ListarOperador: 'https://utp-wscrmsip.azurewebsites.net/api/Maestros/ListarOperador',
    ListarTipoPlan: 'https://utp-wscrmsip.azurewebsites.net/api/Maestros/ListarTipoPlan',
    ListarCallCenterPorUsuario: 'https://utp-wscrmsip.azurewebsites.net/api/Maestros/ListarCallCenterPorUsuario'
  },
  Mantenimientos: {
    Callcenters: {
      list: 'https://utp-wscrmsip.azurewebsites.net/api/Mantenimientos/ListarCallCenter',
      create: 'https://utp-wscrmsip.azurewebsites.net/api/Mantenimientos/InsertarCallCenter',
      update: 'https://utp-wscrmsip.azurewebsites.net/api/Mantenimientos/ActualizarCallCenter'
    },
    Campanas: {
      list: 'https://utp-wscrmsip.azurewebsites.net/api/Mantenimientos/ListarCampanas',
      create: 'https://utp-wscrmsip.azurewebsites.net/api/Mantenimientos/InsertarCampana',
      update: 'https://utp-wscrmsip.azurewebsites.net/api/Mantenimientos/ActualizarCampana'
    },
    Planes: {
      list: 'https://utp-wscrmsip.azurewebsites.net/api/Mantenimientos/ListarPlanes',
      create: 'https://utp-wscrmsip.azurewebsites.net/api/Mantenimientos/InsertarPlan',
      update: 'https://utp-wscrmsip.azurewebsites.net/api/Mantenimientos/ActualizarPlan'
    },
    Usuarios: {
      list: 'https://utp-wscrmsip.azurewebsites.net/api/Mantenimientos/ListarUsuarios',
      create: 'https://utp-wscrmsip.azurewebsites.net/api/Mantenimientos/InsertarUsuario',
      update: 'https://utp-wscrmsip.azurewebsites.net/api/Mantenimientos/ActualizarUsuario'
    }
  },
  Pedidos: {
    list: 'https://utp-wscrmsip.azurewebsites.net/api/Pedido/ListarPedidos',
    create: 'https://utp-wscrmsip.azurewebsites.net/api/Pedido/InsertarPedido',
    update: 'https://utp-wscrmsip.azurewebsites.net/api/Pedido/ActualizarPedido',
    get: 'https://utp-wscrmsip.azurewebsites.net/api/Pedido/ObtenerPedido',
    getPorToken: 'https://utp-wscrmsip.azurewebsites.net/api/Pedido/ObtenerDetalleFirmaDigital',
    actualizarUrlFirmaDigital: 'https://utp-wscrmsip.azurewebsites.net/api/Pedido/ActualizarUrlFirmaDigital',
    delete: 'https://utp-wscrmsip.azurewebsites.net/api/Pedido/EliminarPedido'
  },
  Comentarios:{
    create: 'https://utp-wscrmsip.azurewebsites.net/api/Comentario/InsertarComentario',
    list: 'https://utp-wscrmsip.azurewebsites.net/api/Comentario/ObtenerComentario'
  },
  Notificaciones:{
    list: 'https://utp-wscrmsip.azurewebsites.net/api/Comentario/ObtenerNotificaciones',
    update: 'https://utp-wscrmsip.azurewebsites.net/api/Comentario/CheckNotificaciones',
    listFirmaDigital: 'https://utp-wscrmsip.azurewebsites.net/api/Comentario/ObtenerNotificacionesFirmaDigital',
    updateFirmaDigital: 'https://utp-wscrmsip.azurewebsites.net/api/Comentario/CheckNotificacionesFirmaDigital'
  },
  General:{
    validarLogin: 'https://utp-wscrmsip.azurewebsites.net/api/General/ValidarLogin',
    getNotifications: ''
  },
  Headers: {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
        'Allow': 'GET, POST, OPTIONS, PUT, DELETE',
      })  
  },
  sasGeneratorUrl: 'https://utp-wscrmsip.azurewebsites.net/api/General/ObtenerSAS',
  urlBlobStorage: 'https://sgdstorageutp.blob.core.windows.net/',
  urlGeneral: 'localhost:4200/',
  version: '1.0.0'
  //urlGeneral: 'https://siptest.azurewebsites.net/'
};
