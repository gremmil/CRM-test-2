import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportesventasComponent } from './reportesventas.component';

export const ReportesventasRoutes: Routes = [{
    path: '',
    component: ReportesventasComponent
  }];

  @NgModule({
    imports: [
      RouterModule.forChild(
        ReportesventasRoutes
      )
    ],
    exports: [
      RouterModule
    ]
  })
  export class ReportesventasRoutingModule {}