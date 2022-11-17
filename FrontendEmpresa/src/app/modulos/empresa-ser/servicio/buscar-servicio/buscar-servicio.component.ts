import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ModeloServicio } from 'src/app/modelos/servicio.modelo';
import { ServicioService } from 'src/app/servicios/servicio.service';

@Component({
  selector: 'app-buscar-servicio',
  templateUrl: './buscar-servicio.component.html',
  styleUrls: ['./buscar-servicio.component.css']
})
export class BuscarServicioComponent implements OnInit, OnDestroy {

  listadoServicio:ModeloServicio[]=[];

  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private servicioServicio: ServicioService) { }

  ngOnInit(): void {
    this.ObetenerlistadoServicio();
    this.dtOptions = {
      responsive: true,
      lengthMenu: [[5, 25, 50, -1],
                ['5 Filas ', '25 Filas', '50 Filas ', ' Mostrar todo ']],
      paging: false,
      searching: false,
      ordering: true,
      language: {
        url: "https://cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json",
      },
    }
  }

  ObetenerlistadoServicio(){
    this.servicioServicio.ObtenerServicio().subscribe((datos: ModeloServicio[])=>{
      this.listadoServicio=datos;
      this.dtTrigger.next(datos);
    })
  } 
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
