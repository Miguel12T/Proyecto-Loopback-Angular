import { Component, OnInit,  OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-buscar-personas',
  templateUrl: './buscar-personas.component.html',
  styleUrls: ['./buscar-personas.component.css']
})
export class BuscarPersonasComponent implements OnInit, OnDestroy {

  listadoRegistros: ModeloPersona[] = [];

  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private personaServicio: PersonaService) { }

  ngOnInit(): void {
    this.obtenerListadoPersonas();
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

  obtenerListadoPersonas(){
    this.personaServicio.obtenerRegistros().subscribe((datos: ModeloPersona[])=>{
      this.listadoRegistros = datos;
      this.dtTrigger.next(datos);
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
