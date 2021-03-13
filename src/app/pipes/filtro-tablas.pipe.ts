import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroTablas'
})
export class FiltroTablasPipe implements PipeTransform {

  transform(value: any, arg: any): unknown {
    if(value!){return ''}
    if(arg!){return value}

    if(arg.IdEstadoPedido==0 && arg.IdCallCenter==0 && arg.IdCampana ==0){return value}

    if(arg.IdEstadoPedido!=0 && arg.IdCallCenter==0 && arg.IdCampana ==0){
      return value.filter((element: any) => element.IdEstadoPedido == arg.IdEstadoPedido)
    }
    if(arg.IdEstadoPedido==0 && arg.IdCallCenter!=0 && arg.IdCampana ==0){
      return value.filter((element: any) => element.IdCallCenter == arg.IdCallCenter)
    }
    if(arg.IdEstadoPedido==0 && arg.IdCallCenter==0 && arg.IdCampana !=0){
      return value.filter((element: any) => element.IdCampana == arg.IdCampana)
    }

    if(arg.IdEstadoPedido!=0 && arg.IdCallCenter!=0 && arg.IdCampana ==0){
      return value.filter((element: any)=> element.IdEstadoPedido == arg.IdEstadoPedido && element.IdCallCenter == arg.IdCallCenter)
    }
    if(arg.IdEstadoPedido==0 && arg.IdCallCenter!=0 && arg.IdCampana !=0){
      return value.filter((element: any)=> element.IdCallCenter == arg.IdCallCenter && element.IdCampana == arg.IdCampana)
    }
    if(arg.IdEstadoPedido!=0 && arg.IdCallCenter==0 && arg.IdCampana !=0){
      return value.filter((element: any)=> element.IdEstadoPedido == arg.IdEstadoPedido && element.IdCampana == arg.IdCampana)
    }
    
    if(arg.IdEstadoPedido!=0 && arg.IdCallCenter!=0 && arg.IdCampana !=0){
      return value.filter((element: any)=> element.IdEstadoPedido == arg.IdEstadoPedido && element.IdCallCenter == arg.IdCallCenter && element.IdCampana == arg.IdCampana)
    }
  }

}

/**
 * 
 * 
 import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroTablas'
})
export class FiltroTablasPipe implements PipeTransform {

  transform(value: any, arg: any): unknown {
    if(value!){return ''}
    if(arg!){return value}
    //CASO 1: SIN COINCIDENCIAS
    if(arg.IdEstadoPedido==0 && arg.IdCallCenter==0 && arg.IdCampana ==0 && arg.EstadoFirma == 0){return value}
    //CASO 2: 1 COINCIDENCIA
    if(arg.IdEstadoPedido!=0 && arg.IdCallCenter==0 && arg.IdCampana ==0 && arg.EstadoFirma == 0){
      return value.filter((element: any) => element.IdEstadoPedido == arg.IdEstadoPedido)
    }
    if(arg.IdEstadoPedido==0 && arg.IdCallCenter!=0 && arg.IdCampana ==0 && arg.EstadoFirma == 0){
      return value.filter((element: any) => element.IdCallCenter == arg.IdCallCenter)
    }
    if(arg.IdEstadoPedido==0 && arg.IdCallCenter==0 && arg.IdCampana !=0 && arg.EstadoFirma == 0){
      return value.filter((element: any) => element.IdCampana == arg.IdCampana)
    }
    if(arg.IdEstadoPedido==0 && arg.IdCallCenter==0 && arg.IdCampana ==0 && arg.EstadoFirma != 0){
      return value.filter((element: any) => element.EstadoFirma == arg.EstadoFirma)
    }
    //CASO 3: 2 COINCIDENCIAS
    if(arg.IdEstadoPedido!=0 && arg.IdCallCenter!=0 && arg.IdCampana ==0 && arg.EstadoFirma == 0){
      return value.filter((element: any)=> element.IdEstadoPedido == arg.IdEstadoPedido && element.IdCallCenter == arg.IdCallCenter)
    }
    if(arg.IdEstadoPedido==0 && arg.IdCallCenter!=0 && arg.IdCampana !=0 && arg.EstadoFirma == 0){
      return value.filter((element: any)=> element.IdCallCenter == arg.IdCallCenter && element.IdCampana == arg.IdCampana)
    }
    if(arg.IdEstadoPedido==0 && arg.IdCallCenter==0 && arg.IdCampana !=0 && arg.EstadoFirma != 0){
      return value.filter((element: any)=> element.IdCampana == arg.IdCampana && element.EstadoFirma == arg.EstadoFirma)
    }

    if(arg.IdEstadoPedido!=0 && arg.IdCallCenter==0 && arg.IdCampana ==0 && arg.EstadoFirma != 0){
      return value.filter((element: any)=> element.IdEstadoPedido == arg.IdEstadoPedido && element.EstadoFirma == arg.EstadoFirma)
    }
    if(arg.IdEstadoPedido==0 && arg.IdCallCenter!=0 && arg.IdCampana ==0 && arg.EstadoFirma != 0){
      return value.filter((element: any)=> element.IdCallCenter == arg.IdCallCenter && element.EstadoFirma == arg.EstadoFirma)
    }
    //CASO 4: 3 COINCIDENCIAS
    if(arg.IdEstadoPedido!=0 && arg.IdCallCenter!=0 && arg.IdCampana !=0 && arg.EstadoFirma == 0){
      return value.filter((element: any)=> element.IdEstadoPedido == arg.IdEstadoPedido && element.IdCallCenter == arg.IdCallCenter && element.IdCampana == arg.IdCampana)
    }

    if(arg.IdEstadoPedido==0 && arg.IdCallCenter!=0 && arg.IdCampana !=0 && arg.EstadoFirma != 0){
      return value.filter((element: any)=> element.IdCallCenter == arg.IdCallCenter && element.IdCampana == arg.IdCampana && element.EstadoFirma == arg.EstadoFirma)
    }
    if(arg.IdEstadoPedido!=0 && arg.IdCallCenter==0 && arg.IdCampana !=0 && arg.EstadoFirma != 0){
      return value.filter((element: any)=> element.IdEstadoPedido == arg.IdEstadoPedido && element.IdCampana == arg.IdCampana && element.EstadoFirma == arg.EstadoFirma)
    }
    if(arg.IdEstadoPedido!=0 && arg.IdCallCenter!=0 && arg.IdCampana ==0 && arg.EstadoFirma != 0){
      return value.filter((element: any)=> element.IdEstadoPedido == arg.IdEstadoPedido && element.IdCallCenter == arg.IdCallCenter && element.EstadoFirma == arg.EstadoFirma)
    }
    //CASO 5: 4 COINCIDENCIAS
    if(arg.IdEstadoPedido!=0 && arg.IdCallCenter!=0 && arg.IdCampana !=0 && arg.EstadoFirma != 0){
      return value.filter((element: any)=> element.IdEstadoPedido == arg.IdEstadoPedido && element.IdCallCenter == arg.IdCallCenter && element.IdCampana == arg.IdCampana && element.EstadoFirma == arg.EstadoFirma)
    }
  }

}

 */