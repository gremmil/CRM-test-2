import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator  } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute } from '@angular/router';
import { MantenimientosService } from 'src/app/shared/svcMantenimientos/mantenimientos.service';
import { MantenimientosFormComponent } from '../mantenimientos-form/mantenimientos-form.component';

@Component({
  selector: 'app-mantenimientos-list',
  templateUrl: './mantenimientos-list.component.html',
  styleUrls: ['./mantenimientos-list.component.css']
})
export class MantenimientosListComponent implements OnInit {

  dataSource!: MatTableDataSource<any[]>
  mensajeData!: string
  displayedColumns!: string[] | undefined
  columnas!: Object[] | undefined
  componenteActualTitulo!: any
  componenteActualParrafo!: any
  sufijo: string = '(s)'

  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  searchKey!: string;

  constructor(
    public svcMantenimientos: MantenimientosService,
    public dialog: MatDialog,
    private routeActive: ActivatedRoute
  ) {

   }
   
  ngOnInit(): void {
    this.paginator._intl.firstPageLabel='Primera página';
    this.paginator._intl.itemsPerPageLabel='Registros por página';
    this.paginator._intl.lastPageLabel='Ultima página';
    this.paginator._intl.nextPageLabel='Página siguiente';
    this.paginator._intl.previousPageLabel='Página anterior';

    this.componenteActualTitulo = this.svcMantenimientos.componenteActual?.toLowerCase().replace(/\b[a-z]/g, function(letter) {
      return letter.toUpperCase();
    })
    if(this.componenteActualTitulo == 'Campanas'){
      this.componenteActualTitulo = this.componenteActualTitulo.replace('n','ñ')
    }
    this.componenteActualParrafo = this.componenteActualTitulo.toLowerCase().slice(0,-1)
    if(this.componenteActualParrafo == 'plane'){
      this.componenteActualParrafo = this.componenteActualParrafo.slice(0,-1)
      this.sufijo = '(es)'
    }
    this.columnas = this.svcMantenimientos.obtenerDatosComponenteActual()?.columnasDefinicion
    this.displayedColumns = this.svcMantenimientos.obtenerDatosComponenteActual()?.columnasMostradas
    

    this.svcMantenimientos.obtenerCRUD()?.listarRegistros().subscribe(
      (data: any) => {
        if(data.Error=="200"){
          this.dataSource = new MatTableDataSource(data.Resultado);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }else{
          this.dataSource = new MatTableDataSource();
          this.mensajeData = data.Mensaje
        }
      },
      (error: any) => console.error(error)
    )
  }
  onCreate() {
    this.svcMantenimientos.obtenerCRUD()?.limpiarFormulario();
    const dialogRef = this.dialog.open(MantenimientosFormComponent, {
      width: '60%',
      autoFocus:true,
      disableClose: true,
      panelClass: 'dialog-form-mantenimientos',
      data: {edicion: false}
    });
    dialogRef.afterClosed().subscribe(value=>{
      if(value==true){
        this.ngOnInit();
      }
    })
  }

  onEdit(row: any):void{
    this.svcMantenimientos.obtenerCRUD()?.establecerValorDelFormulario(row);
    if(this.svcMantenimientos.componenteActual == 'usuarios'){
      let ctrlIdCallCenter = this.svcMantenimientos.obtenerCRUD()?.form.controls['idCallCenter']
      if(row.idTipoUsuario == 2){
        let idsCallCenterAsArray = row.idCallCenter.split(',')
        let arrConvertido: number[] = []

        idsCallCenterAsArray.forEach((element : any) => {
          arrConvertido.push(parseInt(element))
        });

        ctrlIdCallCenter?.patchValue(arrConvertido)

      }else{
        this.svcMantenimientos.obtenerCRUD()?.form.controls['idCallCenter'].patchValue(parseInt(row.idCallCenter))
      }
    }
    //this.svcMantenimientos.obtenerCRUD()?.form.get('key')?.patchValue(99)
    const dialogRef = this.dialog.open(MantenimientosFormComponent, {
      width: '60%',
      autoFocus:true,
      disableClose: true,
      panelClass: 'dialog-form-mantenimientos',
      data: {edicion: true}
    });
    dialogRef.afterClosed().subscribe(value=>{
      if(value==true){
        this.ngOnInit();
      }
    })
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  actualizarComponente(){
    this.ngOnInit()
    this.searchKey = "";
  }

}
