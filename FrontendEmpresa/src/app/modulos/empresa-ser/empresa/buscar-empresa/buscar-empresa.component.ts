import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ModeloEmpresa } from 'src/app/modelos/empresa.modelo';
import { EmpresaService } from 'src/app/servicios/empresa.service';

@Component({
  selector: 'app-buscar-empresa',
  templateUrl: './buscar-empresa.component.html',
  styleUrls: ['./buscar-empresa.component.css']
})
export class BuscarEmpresaComponent implements OnInit, OnDestroy {

  listadoRegistros: ModeloEmpresa[] = [];

  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private servicioEmpresa: EmpresaService) { }

  ngOnInit(): void {
    this.obtenerListadoEmpresas();
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

  obtenerListadoEmpresas(){
    this.servicioEmpresa.obtenerRegistros().subscribe((datos: ModeloEmpresa[])=>{
      this.listadoRegistros = datos;
      this.dtTrigger.next(datos);
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
