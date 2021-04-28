import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

import { CanActivateGuard } from './can-activate.guard';

export const AppRoutes: Routes = [

  {
    path: '',
    component: FullComponent,
    canActivate: [CanActivateGuard],
    children:[
      {
        path: '',
        redirectTo: '/mantenimientos/callcenters',
        pathMatch: 'full'
      },
      {
        path: 'mantenimientos',
        loadChildren: () => import('./mantenimientos/mantenimientos.module').then(m => m.MantenimientosModule)
      },
    ]
  },
  {
    path: 'login',
    loadChildren: 
      () => import('./login/login.module').then(m => m.LoginModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      AppRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}