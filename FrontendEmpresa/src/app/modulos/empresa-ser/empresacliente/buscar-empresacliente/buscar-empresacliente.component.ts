import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ModeloEmpresaCliente } from 'src/app/modelos/empresacliente.modelo';
import { EmpresaclienteService } from 'src/app/servicios/empresacliente.service';

@Component({
  selector: 'app-buscar-empresacliente',
  templateUrl: './buscar-empresacliente.component.html',
  styleUrls: ['./buscar-empresacliente.component.css']
})
export class BuscarEmpresaclienteComponent implements OnInit, OnDestroy {

  listadoEmpresacliente: ModeloEmpresaCliente[] = [];

  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private empresaclienteServicio: EmpresaclienteService) { }

  ngOnInit(): void {
    this.ObtenerEmpresacliente();
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


  ObtenerEmpresacliente(){
    this.empresaclienteServicio.ObtenerEmpresacliente().subscribe((datos: ModeloEmpresaCliente[])=>{
      this.listadoEmpresacliente=datos;
      this.dtTrigger.next(datos);
    })
  } 

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
