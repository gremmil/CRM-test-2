import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MantenimientosListComponent } from './mantenimientos-list/mantenimientos-list.component';
import { MatDialog } from '@angular/material/dialog';
import { MantenimientosService } from 'src/app/shared/svcMantenimientos/mantenimientos.service';

@Component({
  selector: 'app-mantenimientos',
  templateUrl: './mantenimientos.component.html',
  styleUrls: ['./mantenimientos.component.css']
})
export class MantenimientosComponent implements OnInit, OnDestroy {
  miFactory!: ComponentFactory<any>;
  componentRef!: ComponentRef<MantenimientosListComponent>
  @ViewChild('componenteDinamico', { read: ViewContainerRef }) componenteDinamico!: ViewContainerRef;
  componenteRutaActual!:string | null

  constructor(
    public service: MantenimientosService,
    public dialog: MatDialog,
    private routeActive: ActivatedRoute,
    private resolver: ComponentFactoryResolver
  ) { 
  }
  
  ngOnDestroy(): void {
  }
  ngOnInit() {
    this.routeActive.paramMap.subscribe(params=>{
      if(params.has("tabla")){
        this.componenteRutaActual = params.get("tabla")
        this.service.enviarComponenteActual(this.componenteRutaActual)
        this.getLazyComponent();   
      }
    })
     
  }

  async getLazyComponent() {
    this.componentRef?.destroy();
    this.componenteDinamico?.clear();
    const { MantenimientosListComponent } = await import('./mantenimientos-list/mantenimientos-list.component');
    this.componentRef = this.componenteDinamico.createComponent(
      this.resolver.resolveComponentFactory(MantenimientosListComponent)
    );

  }

}
