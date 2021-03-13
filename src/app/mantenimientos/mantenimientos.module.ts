import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MantenimientosRoutingModule } from './mantenimientos-routing.module';

import { MantenimientosComponent } from './mantenimientos.component';
import { MantenimientosListComponent } from './mantenimientos-list/mantenimientos-list.component';
import { MantenimientosFormComponent } from './mantenimientos-form/mantenimientos-form.component';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    MantenimientosRoutingModule
  ],
  providers: [],
  entryComponents: [],
  declarations: [
    MantenimientosComponent,
    MantenimientosListComponent,
    MantenimientosFormComponent
  ]
})
export class MantenimientosModule {}
