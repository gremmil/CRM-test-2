//import 'hammerjs';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ReportesventasRoutingModule } from './reportesventas-routing.module';

import { ReportesventasListComponent } from './reportesventas-list/reportesventas-list.component'
import { ReportesventasFormComponent } from './reportesventas-form/reportesventas-form.component'
import { ReportesventasComponent } from './reportesventas.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { GallerymodalComponent } from './reportesventas-form/gallerymodal.component';
import { ReportesventasFormFirmasComponent } from './reportesventas-form-atipico/reportesventas-form-atipico.component';
import { ReportesventasFormCabeceraComponent } from './reportesventas-form/reportesventas-form-cabecera/reportesventas-form-cabecera.component';
import { ReportesventasFormArchivosComponent } from './reportesventas-form/reportesventas-form-archivos/reportesventas-form-archivos.component';
import { ReportesventasFormProductosComponent } from './reportesventas-form/reportesventas-form-productos/reportesventas-form-productos.component';
import { ReportesventasFormCostesComponent } from './reportesventas-form/reportesventas-form-costes/reportesventas-form-costes.component';

@NgModule({
    imports: [
      CommonModule,
      DemoMaterialModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      FlexLayoutModule,
      CdkTableModule,
      ReportesventasRoutingModule
    ],
    providers: [],
    entryComponents: [],
    declarations: [
      ReportesventasComponent,
      ReportesventasListComponent,
      ReportesventasFormComponent,
      ComentariosComponent,
      GallerymodalComponent,
      ReportesventasFormFirmasComponent,
      ReportesventasFormCabeceraComponent,
      ReportesventasFormArchivosComponent,
      ReportesventasFormProductosComponent,
      ReportesventasFormCostesComponent
    ]
  })
  export class ReportesventasModule {}
  