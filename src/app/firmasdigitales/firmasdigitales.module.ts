import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FirmasdigitalesRoutingModule } from './firmasdigitales-routing.module';
import { FirmasdigitalesComponent } from './firmasdigitales.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FirmasdigitalesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    FirmasdigitalesRoutingModule
  ]
})
export class FirmasdigitalesModule {}
