import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
const EXCEL_TYPE=
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8'
const EXCEL_EXT = '.xlsx'
@Injectable({
  providedIn: 'root'
})
export class ExportacionArchivosService {

  constructor() { }

  exportarExcel(json: any[], nombreArchivoExcel): void{
    const worksheet : XLSX.WorkSheet = XLSX.utils.json_to_sheet(json)
    const workbook: XLSX.WorkBook = { 
      Sheets: {'data' : worksheet},
      SheetNames: ['data'],
      Props: {Author:"SheetJS"}
    }
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array'})
    this.guardarExcel(excelBuffer, nombreArchivoExcel)
  }
  private guardarExcel(buffer: any, nombreArchivo: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE})

    FileSaver.saveAs(data, nombreArchivo + '_export_' + new Date().getTime().toString() + EXCEL_EXT)
  }
}
