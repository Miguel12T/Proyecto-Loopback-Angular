import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ModeloDirectivo } from 'src/app/modelos/directivo.modelo';
import { DirectivoService } from 'src/app/servicios/directivo.service';

@Component({
  selector: 'app-buscar-directivo',
  templateUrl: './buscar-directivo.component.html',
  styleUrls: ['./buscar-directivo.component.css']
})
export class BuscarDirectivoComponent implements OnInit, OnDestroy {

  listadoRegistros: ModeloDirectivo[] = [];

  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private servicioDirectivo: DirectivoService,) { }

  ngOnInit(): void {
    this.obtenerListadoDirectivos();
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

  obtenerListadoDirectivos(){
    this.servicioDirectivo.obtenerRegistros().subscribe((datos: ModeloDirectivo[])=>{
      this.listadoRegistros = datos;
      this.dtTrigger.next(datos);
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
