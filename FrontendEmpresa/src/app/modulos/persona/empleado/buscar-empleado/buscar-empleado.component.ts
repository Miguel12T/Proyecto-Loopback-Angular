import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModeloEmpleado } from 'src/app/modelos/empleado.model';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import { DataTablesModule } from "angular-datatables";
import { Subject } from 'rxjs';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { PersonaService } from 'src/app/servicios/persona.service';


@Component({
  selector: 'app-buscar-empleado',
  templateUrl: './buscar-empleado.component.html',
  styleUrls: ['./buscar-empleado.component.css']
})
export class BuscarEmpleadoComponent implements OnInit, OnDestroy {

  listadoRegistros: ModeloEmpleado[] = [];
  
  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private servicioEmpleado: EmpleadoService,
    private servicioPersona: PersonaService) { }

  ngOnInit(): void {
    this.obtenerListadoEmpleados();
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

  obtenerListadoEmpleados(){
    this.servicioEmpleado.obtenerRegistros().subscribe(async( datos: ModeloEmpleado[])=>{
      this.listadoRegistros = datos
      this.dtTrigger.next(datos);
    })
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  

}
