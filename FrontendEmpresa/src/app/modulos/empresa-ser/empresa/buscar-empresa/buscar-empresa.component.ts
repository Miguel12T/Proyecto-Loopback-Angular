import { Component, OnInit } from '@angular/core';
import { ModeloEmpresa } from 'src/app/modelos/empresa.modelo';
import { EmpresaService } from 'src/app/servicios/empresa.service';

@Component({
  selector: 'app-buscar-empresa',
  templateUrl: './buscar-empresa.component.html',
  styleUrls: ['./buscar-empresa.component.css']
})
export class BuscarEmpresaComponent implements OnInit {

  listadoRegistros: ModeloEmpresa[] = [];

  constructor(private servicioEmpresa: EmpresaService) { }

  ngOnInit(): void {
    this.obtenerListadoEmpresas();
  }

  obtenerListadoEmpresas(){
    this.servicioEmpresa.obtenerRegistros().subscribe((datos: ModeloEmpresa[])=>{
      this.listadoRegistros = datos;
    })
  }

}
