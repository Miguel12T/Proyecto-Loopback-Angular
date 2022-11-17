import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ModeloCliente } from 'src/app/modelos/cliente.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-buscar-cliente',
  templateUrl: './buscar-cliente.component.html',
  styleUrls: ['./buscar-cliente.component.css']
})
export class BuscarClienteComponent implements OnInit, OnDestroy {

  listadoRegistros: ModeloCliente[] = [];

  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private servicioCliente: ClienteService) { }

  ngOnInit(): void {
    this.obtenerListadoClientes();
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

  obtenerListadoClientes(){
    this.servicioCliente.obtenerRegistros().subscribe((datos: ModeloCliente[])=>{
      this.listadoRegistros = datos;
      this.dtTrigger.next(datos);
    })
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
