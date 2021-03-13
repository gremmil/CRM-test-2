import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Plan } from 'src/app/models';
import { PedidoCabeceraService } from './pedido-cabecera.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoProductosService {

  planes!: Plan[]
  planesFiltroCampana!: Plan[]

  constructor(
    private formBuilder: FormBuilder,
    private svcPedidoCabecera: PedidoCabeceraService
  ) { }
  //FORMULARIO
  frmProdFibra = this.formBuilder.array([])
  frmProdTvMovil = this.formBuilder.array([])
  frmProdLineaMovil = this.formBuilder.array([])

  agregarProductoLineasMoviles(idCount: number) {
    const productoFormGroup = this.formBuilder.group({
      idPedidoProducto: [{ value: 0, disabled: false }],
      idPedido: [{ value: 0, disabled: true }],
      idTipoProducto: [0, Validators.required],
      idPlan: [0, Validators.required],

      flagPortabilidad: ['1', [Validators.required, Validators.maxLength(1)]],
      idOperador: [{ value: 0, disabled: false }, [Validators.required, Validators.maxLength(10)]],
      numeroFijo: [{ value: '', disabled: false }, [Validators.required, Validators.maxLength(10)]],
      idTipoPlan: [{ value: 0, disabled: false }, Validators.required],
      numeroICC: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(30)]],
      flagMismoTitular: [{ value: '1', disabled: false }, [Validators.required, Validators.maxLength(1)]],

      idTipoDocumento: [{ value: 0, disabled: true }, Validators.required],
      nroDocumento: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(9)]],
      nombresTitular: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(200)]],
      apellidosTitular: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(200)]],


      flagConTV: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(1)]],
      idsPaquetesTV: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(100)]],

      flagDeco: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(1)]]

    });
    productoFormGroup.patchValue({
      idTipoProducto: idCount
    })
    //productoFormGroup.controls['idTipoPlan'].enable()
    this.frmProdLineaMovil.push(productoFormGroup);
  }
  agregarProductoLineasMovilesAtipico(count: number){
    this.agregarProductoLineasMoviles(count)
    let ctrl = this.frmProdLineaMovil.controls[this.frmProdLineaMovil.length-1]

    ctrl.get('flagPortabilidad').disable()
    ctrl.get('idOperador').disable()
    ctrl.get('numeroFijo').disable()
    ctrl.get('idTipoPlan').disable()
    ctrl.get('flagMismoTitular').disable()
  }
  agregarProductoFibra() {
    const productoFibraForm = this.formBuilder.group({
      idPedidoProducto: [{ value: 0, disabled: true }],
      idPedido: [{ value: 0, disabled: true }],
      idTipoProducto: [1, Validators.required],
      idPlan: [0, Validators.required],

      flagPortabilidad: ['1', [Validators.required, Validators.maxLength(1)]],
      idOperador: [{ value: 0, disabled: false }, [Validators.required, Validators.maxLength(10)]],
      numeroFijo: [{ value: '', disabled: false }, [Validators.required, Validators.maxLength(10)]],
      idTipoPlan: [{ value: 0, disabled: true }, Validators.required],
      numeroICC: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(30)]],
      flagMismoTitular: [{ value: '1', disabled: false }, [Validators.required, Validators.maxLength(1)]],

      idTipoDocumento: [{ value: 0, disabled: true }, Validators.required],
      nroDocumento: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(9)]],
      nombresTitular: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(200)]],
      apellidosTitular: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(200)]],


      flagConTV: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(1)]],
      idsPaquetesTV: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(100)]],

      flagDeco: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(1)]]

    });
    this.frmProdFibra.push(productoFibraForm);
  }
  agregarProductoFibraAtipico() {
    this.agregarProductoFibra()
    let ctrl = this.frmProdFibra.controls[0]
    ctrl.get('flagPortabilidad').disable()
    ctrl.get('idOperador').disable()
    ctrl.get('numeroFijo').disable()
    ctrl.get('flagMismoTitular').disable()

  }
  agregarProductoTvMovil() {
    let invalid: boolean
    if (this.svcPedidoCabecera.form.value.idCampana == 1) {//VODAFONE
      invalid = false
    } else {
      invalid = true
    }
    const productTvMovilForm = this.formBuilder.group({
      idPedidoProducto: [{ value: 0, disabled: true }],
      idPedido: [{ value: 0, disabled: true }],
      idTipoProducto: [4, Validators.required],
      idPlan: [{ value: 0, disabled: true }, Validators.required],

      flagPortabilidad: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(1)]],
      idOperador: [{ value: 0, disabled: true }, [Validators.required, Validators.maxLength(10)]],
      numeroFijo: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(10)]],
      idTipoPlan: [{ value: 0, disabled: true }, Validators.required],
      numeroICC: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(30)]],
      flagMismoTitular: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(1)]],

      idTipoDocumento: [{ value: 0, disabled: true }, Validators.required],
      nroDocumento: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(9)]],
      nombresTitular: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(200)]],
      apellidosTitular: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(200)]],


      flagConTV: [{ value: '1', disabled: false }, [Validators.required, Validators.maxLength(1)]],
      idsPaquetesTV: [{ value: '', disabled: invalid }, [Validators.required, Validators.maxLength(100)]],
      flagDeco: [{ value: '1', disabled: invalid }, [Validators.required, Validators.maxLength(1)]]
    })
    this.frmProdTvMovil.push(productTvMovilForm)

  }

  removerProducto(indice: number, idTipoProducto: number) {
    switch (idTipoProducto) {
      case 1:
        this.frmProdFibra.removeAt(indice);
        break;
      case 4:
        this.frmProdTvMovil.removeAt(indice);
        break;
      default:
        this.frmProdLineaMovil.removeAt(indice);
        break;
    }
  }

  //CAMPOS_FORM
  camposForm = [

    { tipo: 'hidden', clave: 'idTipoProducto', titulo: '', validacion: true, oculto: false },
    { tipo: 'select', clave: 'idPlan', titulo: 'Selecciona Plan', validacion: true, cols: 'col-12', rows: 1, oculto: false },

    { tipo: 'radio', clave: 'flagPortabilidad', titulo: '', validacion: true, cols: 'col-12', rows: 1, oculto: false },
    { tipo: 'select', clave: 'idOperador', titulo: 'Selecciona Operador', validacion: true, cols: 'col-6', rows: 1, oculto: true },
    { tipo: 'text', clave: 'numeroFijo', titulo: 'Número Móvil', validacion: true, cols: 'col-6', rows: 1, oculto: true },

    { tipo: 'select', clave: 'idTipoPlan', titulo: 'Modalidad de Plan', validacion: true, cols: 'col-6', rows: 1, oculto: true },
    { tipo: 'text', clave: 'numeroICC', titulo: 'Número ICC', validacion: true, cols: 'col-6', rows: 1, oculto: true },
    { tipo: 'radio', clave: 'flagMismoTitular', titulo: '', validacion: true, cols: 'col-12', rows: 1, oculto: true },

    { tipo: 'select', clave: 'idTipoDocumento', titulo: 'Tipo de Documento', validacion: true, cols: 'col-6', rows: 1, oculto: true },
    { tipo: 'text', clave: 'nroDocumento', titulo: 'Número de Documento', validacion: true, cols: 'col-6', rows: 1, oculto: true },
    { tipo: 'text', clave: 'nombresTitular', titulo: 'Nombres Titular', validacion: true, cols: 'col-6', rows: 1, oculto: true },
    { tipo: 'text', clave: 'apellidosTitular', titulo: 'Apellidos Titular', validacion: true, cols: 'col-6', rows: 1, oculto: true },


    { tipo: 'radio', clave: 'flagConTV', titulo: '', validacion: true, cols: 'col-12', rows: 1, oculto: true },
    { tipo: 'select', clave: 'idsPaquetesTV', titulo: 'Planes', validacion: true, cols: 'col-6', rows: 1, oculto: true },

    { tipo: 'radio', clave: 'flagDeco', titulo: '', validacion: true, cols: 'col-6', rows: 1, oculto: true }
  ]

  camposFormAtipico = [

    { tipo: 'hidden', clave: 'idTipoProducto', titulo: '', validacion: true, oculto: false },
    { tipo: 'select', clave: 'idPlan', titulo: 'Selecciona Plan', titulo2:'Tarjeta SIM', validacion: true, cols: 'col-12', rows: 1, oculto: false }
  ]

  //METODOS AUXILIARES

  detectarcambiosEnFormulario() {
    this.frmProdLineaMovil.valueChanges.subscribe(val => {
    })
  }

  cambioRadioBtn(i: number, clv: string, idTipoProducto: number) {
    let control: any
    let valFlag: any
    let indexFlagPortabilidad: any
    switch (idTipoProducto) {
      case 1:
        control = this.frmProdFibra.controls[i];//detectamos el control del elemento del formArray*/
        valFlag = this.frmProdFibra.value[i][clv];//detectamos el valor del flag en el elemento del formArray
        indexFlagPortabilidad = this.camposForm.findIndex((campo) => {//buscamos el indice de flag en el array de los campos del Formulario
          return campo.clave == clv
        })
        break;
      case 2:
        control = this.frmProdLineaMovil.controls[i];//detectamos el control del elemento del formArray*/
        valFlag = this.frmProdLineaMovil.value[i][clv];//detectamos el valor del flag en el elemento del formArray
        indexFlagPortabilidad = this.camposForm.findIndex((campo) => {//buscamos el indice de flag en el array de los campos del Formulario
          return campo.clave == clv
        })
        break;
      case 3:
        control = this.frmProdLineaMovil.controls[i];//detectamos el control del elemento del formArray*/
        valFlag = this.frmProdLineaMovil.value[i][clv];//detectamos el valor del flag en el elemento del formArray
        indexFlagPortabilidad = this.camposForm.findIndex((campo) => {//buscamos el indice de flag en el array de los campos del Formulario
          return campo.clave == clv
        })
        break;
      case 4:
        control = this.frmProdTvMovil.controls[i];//detectamos el control del elemento del formArray*/
        valFlag = this.frmProdTvMovil.value[i][clv];//detectamos el valor del flag en el elemento del formArray
        indexFlagPortabilidad = this.camposForm.findIndex((campo) => {//buscamos el indice de flag en el array de los campos del Formulario
          return campo.clave == clv
        })
        break;
    }
    //Cambio en el flag de portabilidad
    switch (clv) {
      case 'flagPortabilidad':
        if (valFlag == '0') {
          this.inhabilitarCampos(indexFlagPortabilidad, control)
        } else {
          this.habilitarCampos(indexFlagPortabilidad, control, clv)
        }
        break;
      case 'flagMismoTitular':
        if (valFlag == '1') {
          this.inhabilitarCampos(indexFlagPortabilidad, control)
        } else {
          this.habilitarCampos(indexFlagPortabilidad, control, clv)
        }
        break;
    }
  }
  cambioSelect(i: number, clv: string) {

    if (this.frmProdLineaMovil.value[i] != undefined) {
      const valSelect = this.frmProdLineaMovil.value[i][clv];//detectamos el valor del flag en el elemento del formArray
      const control = this.frmProdLineaMovil.controls[i];

      switch (clv) {
        case 'idTipoPlan':
          let ctrl: any = control.get('numeroICC')
          if (valSelect == 2) {
            ctrl.enable()
          } else {
            ctrl.disable()
          }
          break;
      }

    }

  }
  inhabilitarCampos(iFlag: number, control: AbstractControl) {
    this.camposForm.forEach((campo, index, arr) => {//iteramos sobre los elementos del
      if (index > iFlag) {
        let ctrl: any = control.get([campo.clave]);
        ctrl.disable()
      }
    })
  }
  habilitarCampos(iFlag: number, control: AbstractControl, clv: string) {
    this.camposForm.forEach((campo, index, arr) => {//iteramos sobre los elementos del
      switch (clv) {
        case 'flagPortabilidad':
          //fibra optica
          if (control.get('idTipoProducto')?.value == 1) {
            if (index > iFlag && index <= iFlag + 5) {
              if (campo.clave != 'idTipoPlan' && campo.clave != 'numeroICC') {
                let ctrl: any = control.get([campo.clave]);
                ctrl.enable()
              }
            }
          } else {//lineas moviles
            if (index > iFlag && index <= iFlag + 5) {
              if (campo.clave != 'numeroICC') {
                let ctrl: any = control.get([campo.clave]);
                ctrl.enable()
              } else {
                if (control.get('idTipoPlan')?.value == 2) {
                  let ctrl: any = control.get([campo.clave]);
                  ctrl.enable()
                }
              }
            }
          }
          break;
        case 'flagMismoTitular':
          //fibra optica
          if (control.get('idTipoProducto')?.value == 1) {
            if (index > iFlag && index <= iFlag + 4) {
              let ctrl: any = control.get([campo.clave]);
              ctrl.enable()
            }
          } else {//lineas moviles
            if (index > iFlag && index <= iFlag + 4) {
              let ctrl: any = control.get([campo.clave]);
              ctrl.enable()
            }
          }
          break;
      }


    })

  }
  getIndexProducto(i: number) {
    const control = this.frmProdLineaMovil.controls[i];
    const productosMoviles = this.frmProdLineaMovil.value.filter((prod: any) => {
      return prod.idTipoProducto == 2 || prod.idTipoProducto == 3
    })
    const index = productosMoviles.findIndex((producto: any) => {
      return producto.idPedidoProducto == control.value.idPedidoProducto
    })
    return index + 1
  }
  getPlanes(i: number, idTipoProducto: number) {

    let control!: any
    let productosMoviles!: any
    let index!: any
    let filtro: Plan[] = []
    switch (idTipoProducto) {
      case 1:
        control = this.frmProdFibra.controls[i];
        break;
      case 2:
        control = this.frmProdLineaMovil.controls[i];
        break;
      case 3:
        control = this.frmProdLineaMovil.controls[i];
        break;
      case 4:
        control = this.frmProdTvMovil.controls[i];
        break;
    }

    if (this.planesFiltroCampana != undefined) {

      /*index = this.svcPedido.pedidoProducto.value.findIndex((producto: any) => {
        return producto.idPedidoProducto == control.value.idPedidoProducto
      })*/
      //const idTipoProductoActual = control.get('idTipoProducto')?.value 
      const idTipoProductoActual = idTipoProducto

      if (idTipoProductoActual == 1) {
        filtro = this.planesFiltroCampana.filter(plan => {
          return plan.idTipoProducto == idTipoProductoActual
        })
      } else if (idTipoProductoActual == 2 || idTipoProductoActual == 3) {
        if (i == 0) {
          filtro = this.planesFiltroCampana.filter(plan => {
            return plan.idTipoProducto == 2
          })
        } else {
          filtro = this.planesFiltroCampana.filter(plan => {
            return plan.idTipoProducto == 3
          })
        }
      } else {
        filtro = this.planesFiltroCampana.filter(plan => {
          return plan.idTipoProducto == idTipoProductoActual
        })
      }
    }

    return filtro;
  }
  planInactivo(idPlan: number){
    let plan = this.planesFiltroCampana.filter(plan=> plan.idPlan == idPlan)
    let inactivo: boolean
    if(plan[0]!=undefined){
      if(plan[0].estado=="Inactivo"){
        inactivo = true
      }else{
        inactivo = false
      }
    }
    return inactivo
  }
  planInactivoMultiple(idsPlanes: number[]){
    let planes: Plan[]
    let inactivo: boolean
    if(idsPlanes.length>0){
      planes = this.planesFiltroCampana.filter(plan=> {
        if(idsPlanes.includes(plan.idPlan) && plan.estado=='Inactivo'){
          return true
        }else{
          return false
        }
      })
    }
    if(planes!=undefined){
      if(planes.length>0){
        inactivo = true
      }else{
        inactivo = false
      }
    }
    
    return inactivo
  }
}
