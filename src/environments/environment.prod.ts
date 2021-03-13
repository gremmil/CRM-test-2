// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

/*
import { HttpHeaders } from "@angular/common/http"

export const environment = {
  production: true,
  Maestros: {
    TiposUsuario: 'https://wscrmsip.azurewebsites.net/api/Maestros/ListarTipoUsuario',
    TiposProducto: 'https://wscrmsip.azurewebsites.net/api/Maestros/ListarTipoProducto',
    TiposDocumentos: 'https://wscrmsip.azurewebsites.net/api/Maestros/ListarTipoDocumento',
    EstadoPedidos: 'https://wscrmsip.azurewebsites.net/api/Maestros/ListarEstadoPedido',
    ListarProvincia: 'https://wscrmsip.azurewebsites.net/api/Maestros/ListarProvincia',
    ListarOperador: 'https://wscrmsip.azurewebsites.net/api/Maestros/ListarOperador',
    ListarTipoPlan: 'https://wscrmsip.azurewebsites.net/api/Maestros/ListarTipoPlan',
    ListarCallCenterPorUsuario: 'https://wscrmsip.azurewebsites.net/api/Maestros/ListarCallCenterPorUsuario'
  },
  Mantenimientos: {
    Callcenters: {
      list: 'https://wscrmsip.azurewebsites.net/api/Mantenimientos/ListarCallCenter',
      create: 'https://wscrmsip.azurewebsites.net/api/Mantenimientos/InsertarCallCenter',
      update: 'https://wscrmsip.azurewebsites.net/api/Mantenimientos/ActualizarCallCenter'
    },
    Campanas: {
      list: 'https://wscrmsip.azurewebsites.net/api/Mantenimientos/ListarCampanas',
      create: 'https://wscrmsip.azurewebsites.net/api/Mantenimientos/InsertarCampana',
      update: 'https://wscrmsip.azurewebsites.net/api/Mantenimientos/ActualizarCampana'
    },
    Planes: {
      list: 'https://wscrmsip.azurewebsites.net/api/Mantenimientos/ListarPlanes',
      create: 'https://wscrmsip.azurewebsites.net/api/Mantenimientos/InsertarPlan',
      update: 'https://wscrmsip.azurewebsites.net/api/Mantenimientos/ActualizarPlan'
    },
    Usuarios: {
      list: 'https://wscrmsip.azurewebsites.net/api/Mantenimientos/ListarUsuarios',
      create: 'https://wscrmsip.azurewebsites.net/api/Mantenimientos/InsertarUsuario',
      update: 'https://wscrmsip.azurewebsites.net/api/Mantenimientos/ActualizarUsuario'
    }
  },
  Pedidos: {
    list: 'https://wscrmsip.azurewebsites.net/api/Pedido/ListarPedidos',
    create: 'https://wscrmsip.azurewebsites.net/api/Pedido/InsertarPedido',
    update: 'https://wscrmsip.azurewebsites.net/api/Pedido/ActualizarPedido',
    get: 'https://wscrmsip.azurewebsites.net/api/Pedido/ObtenerPedido',
    getPorToken: 'https://wscrmsip.azurewebsites.net/api/Pedido/ObtenerDetalleFirmaDigital',
    actualizarUrlFirmaDigital: 'https://wscrmsip.azurewebsites.net/api/Pedido/ActualizarUrlFirmaDigital',
    delete: 'https://wscrmsip.azurewebsites.net/api/Pedido/EliminarPedido'
  },
  Comentarios:{
    create: 'https://wscrmsip.azurewebsites.net/api/Comentario/InsertarComentario',
    list: 'https://wscrmsip.azurewebsites.net/api/Comentario/ObtenerComentario'
  },
  Notificaciones:{
    list: 'https://wscrmsip.azurewebsites.net/api/Comentario/ObtenerNotificaciones',
    update: 'https://wscrmsip.azurewebsites.net/api/Comentario/CheckNotificaciones',
    listFirmaDigital: 'https://wscrmsip.azurewebsites.net/api/Comentario/ObtenerNotificacionesFirmaDigital',
    updateFirmaDigital: 'https://wscrmsip.azurewebsites.net/api/Comentario/CheckNotificacionesFirmaDigital'
  },
  General:{
    validarLogin: 'https://wscrmsip.azurewebsites.net/api/General/ValidarLogin',
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
  sasGeneratorUrl: 'https://wscrmsip.azurewebsites.net/api/General/ObtenerSAS',
  urlBlobStorage: 'https://storagesip.blob.core.windows.net/',
  //urlGeneral: 'localhost:4200/'
  urlGeneral: 'http://crmsip.com/'

};
*/
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { HttpHeaders } from "@angular/common/http"

export const environment = {
  production: true,
  Maestros: {
    TiposUsuario: 'https://sipservice.azurewebsites.net/api/Maestros/ListarTipoUsuario',
    TiposProducto: 'https://sipservice.azurewebsites.net/api/Maestros/ListarTipoProducto',
    TiposDocumentos: 'https://sipservice.azurewebsites.net/api/Maestros/ListarTipoDocumento',
    EstadoPedidos: 'https://sipservice.azurewebsites.net/api/Maestros/ListarEstadoPedido',
    ListarProvincia: 'https://sipservice.azurewebsites.net/api/Maestros/ListarProvincia',
    ListarOperador: 'https://sipservice.azurewebsites.net/api/Maestros/ListarOperador',
    ListarTipoPlan: 'https://sipservice.azurewebsites.net/api/Maestros/ListarTipoPlan',
    ListarCallCenterPorUsuario: 'https://sipservice.azurewebsites.net/api/Maestros/ListarCallCenterPorUsuario'
  },
  Mantenimientos: {
    Callcenters: {
      list: 'https://sipservice.azurewebsites.net/api/Mantenimientos/ListarCallCenter',
      create: 'https://sipservice.azurewebsites.net/api/Mantenimientos/InsertarCallCenter',
      update: 'https://sipservice.azurewebsites.net/api/Mantenimientos/ActualizarCallCenter'
    },
    Campanas: {
      list: 'https://sipservice.azurewebsites.net/api/Mantenimientos/ListarCampanas',
      create: 'https://sipservice.azurewebsites.net/api/Mantenimientos/InsertarCampana',
      update: 'https://sipservice.azurewebsites.net/api/Mantenimientos/ActualizarCampana'
    },
    Planes: {
      list: 'https://sipservice.azurewebsites.net/api/Mantenimientos/ListarPlanes',
      create: 'https://sipservice.azurewebsites.net/api/Mantenimientos/InsertarPlan',
      update: 'https://sipservice.azurewebsites.net/api/Mantenimientos/ActualizarPlan'
    },
    Usuarios: {
      list: 'https://sipservice.azurewebsites.net/api/Mantenimientos/ListarUsuarios',
      create: 'https://sipservice.azurewebsites.net/api/Mantenimientos/InsertarUsuario',
      update: 'https://sipservice.azurewebsites.net/api/Mantenimientos/ActualizarUsuario'
    }
  },
  Pedidos: {
    list: 'https://sipservice.azurewebsites.net/api/Pedido/ListarPedidos',
    create: 'https://sipservice.azurewebsites.net/api/Pedido/InsertarPedido',
    update: 'https://sipservice.azurewebsites.net/api/Pedido/ActualizarPedido',
    get: 'https://sipservice.azurewebsites.net/api/Pedido/ObtenerPedido',
    getPorToken: 'https://sipservice.azurewebsites.net/api/Pedido/ObtenerDetalleFirmaDigital',
    actualizarUrlFirmaDigital: 'https://sipservice.azurewebsites.net/api/Pedido/ActualizarUrlFirmaDigital',
    delete: 'https://sipservice.azurewebsites.net/api/Pedido/EliminarPedido'
  },
  Comentarios:{
    create: 'https://sipservice.azurewebsites.net/api/Comentario/InsertarComentario',
    list: 'https://sipservice.azurewebsites.net/api/Comentario/ObtenerComentario'
  },
  Notificaciones:{
    list: 'https://sipservice.azurewebsites.net/api/Comentario/ObtenerNotificaciones',
    update: 'https://sipservice.azurewebsites.net/api/Comentario/CheckNotificaciones',
    listFirmaDigital: 'https://sipservice.azurewebsites.net/api/Comentario/ObtenerNotificacionesFirmaDigital',
    updateFirmaDigital: 'https://sipservice.azurewebsites.net/api/Comentario/CheckNotificacionesFirmaDigital'
  },
  General:{
    validarLogin: 'https://sipservice.azurewebsites.net/api/General/ValidarLogin',
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
  sasGeneratorUrl: 'https://sipservice.azurewebsites.net/api/General/ObtenerSAS',
  urlBlobStorage: 'https://sgdstorageutp.blob.core.windows.net/',
  //urlGeneral: 'localhost:4200/'
  urlGeneral: 'https://siptest.azurewebsites.net/'
};
