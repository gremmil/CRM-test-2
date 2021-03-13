import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MantenimientosComponent } from './mantenimientos.component';

export const ComponentsRoutes: Routes = [
  {path: ':tabla', component: MantenimientosComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(ComponentsRoutes)
  ],
  exports: [
    RouterModule
  ]

})
export class MantenimientosRoutingModule { }
