import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PedidoCoste } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class PedidoCostesService {

  constructor(
    private formBuilder: FormBuilder,
  ) { }
  //FORMULARIO PEDIDO COSTE
  form = this.formBuilder.group({
    costePromocional: ['',[Validators.required]],
    costeReal: ['',[Validators.required]],
    promocionAplicar: ['',[Validators.required]]
  })
  limpiarFormulario(): void {
    this.form.reset()
    this.form.setValue(new PedidoCoste())
  }
  establecerValorDelFormulario(item: PedidoCoste){
    this.form.patchValue(item)
  }
  deshabilitarCampos(){
    this.form.controls['promocionAplicar'].disable()
  }
  habilitarCampos(){
    this.form.controls['promocionAplicar'].enable()
  }
  //CAMPOS FORM PEDIDO_COSTE
  camposForm = [
    { cols: 'col-6 col-md-3', rows: '1', tipo: 'text', clave: 'costePromocional', titulo: 'Coste Promocional', validacion: false },
    { cols: 'col-6 col-md-3', rows: '1', tipo: 'text', clave: 'costeReal', titulo: 'Coste Real', validacion: false },
    { cols: 'col-12 col-sm-12 col-md-6', rows: '1', tipo: 'text', clave: 'promocionAplicar', titulo: 'Promocion a Aplicar', validacion: false }
  ]

  camposFormAtipico = [
    { cols: 'col-6', rows: '1', tipo: 'text', clave: 'costePromocional', titulo: 'Coste Promocional', validacion: false },
    { cols: 'col-6', rows: '1', tipo: 'text', clave: 'costeReal', titulo: 'Coste Real', validacion: false }
  ]
}
