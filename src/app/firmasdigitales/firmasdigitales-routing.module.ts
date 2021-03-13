import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirmasdigitalesComponent } from './firmasdigitales.component';

const routes: Routes = [
  { path: ':pedido', component: FirmasdigitalesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirmasdigitalesRoutingModule { }