import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModeloEmpleado } from 'src/app/modelos/empleado.model';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import { DataTablesModule } from "angular-datatables";
import { Subject } from 'rxjs';


@Component({
  selector: 'app-buscar-empleado',
  templateUrl: './buscar-empleado.component.html',
  styleUrls: ['./buscar-empleado.component.css']
})
export class BuscarEmpleadoComponent implements OnInit, OnDestroy {

  listadoRegistros: ModeloEmpleado[] = [];
  
  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private servicioEmpleado: EmpleadoService) { }

  ngOnInit(): void {
    this.obtenerListadoEmpleados();
    this.dtOptions = {
      /* language: {
        url: "//cdn.datatables.net/plug-ins/1.10.16/i18/Spanish.json"
      }, */
      // pagingType: 'full-numbers',
    }
  }

  obtenerListadoEmpleados(){
    this.servicioEmpleado.obtenerRegistros().subscribe((datos: ModeloEmpleado[])=>{
      this.listadoRegistros = datos;
      this.dtTrigger.next(datos);
    })
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  

}
