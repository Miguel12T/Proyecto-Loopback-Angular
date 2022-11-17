import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ModeloTiposervicio } from 'src/app/modelos/tiposervicio.modelo';
import { TiposervicioService } from 'src/app/servicios/tiposervicio.service';

@Component({
  selector: 'app-buscar-tipo',
  templateUrl: './buscar-tipo.component.html',
  styleUrls: ['./buscar-tipo.component.css']
})
export class BuscarTipoComponent implements OnInit, OnDestroy {

  listadoTiposervicio: ModeloTiposervicio[] = [];

  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private tiposervicioServicio: TiposervicioService) { }

  ngOnInit(): void {
    this.ObetenerlistadoTiposervicio();
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
  ObetenerlistadoTiposervicio(){
    this.tiposervicioServicio.ObtenerTiposervicio().subscribe((datos: ModeloTiposervicio[])=>{
      this.listadoTiposervicio=datos;
      this.dtTrigger.next(datos);
    })
  } 
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
