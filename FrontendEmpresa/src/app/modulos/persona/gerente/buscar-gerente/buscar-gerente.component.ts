import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ModeloGerente } from 'src/app/modelos/gerente.modelo';
import { GerenteService } from 'src/app/servicios/gerente.service';

@Component({
  selector: 'app-buscar-gerente',
  templateUrl: './buscar-gerente.component.html',
  styleUrls: ['./buscar-gerente.component.css']
})
export class BuscarGerenteComponent implements OnInit, OnDestroy {

  listadoRegistros: ModeloGerente[] = [];

  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private servicioGerente: GerenteService) { }

  ngOnInit(): void {
    this.obtenerListadoGerentes();
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

  obtenerListadoGerentes(){
    this.servicioGerente.obtenerRegistros().subscribe((datos: ModeloGerente[])=>{
      this.listadoRegistros = datos;
      this.dtTrigger.next(datos);
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
