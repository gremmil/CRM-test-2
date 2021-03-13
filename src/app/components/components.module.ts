import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NotificacionesComponent } from './notificaciones/notificaciones.component';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
    
  ],
  exports: [
    NotificacionesComponent
  ],
  providers: [],
  entryComponents: [NotificacionesComponent],
  declarations: [
    NotificacionesComponent
  ]
})
export class ComponentsModule {}
