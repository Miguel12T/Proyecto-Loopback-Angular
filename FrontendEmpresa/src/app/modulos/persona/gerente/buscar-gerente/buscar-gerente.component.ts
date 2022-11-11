import { Component, OnInit } from '@angular/core';
import { ModeloGerente } from 'src/app/modelos/gerente.modelo';
import { GerenteService } from 'src/app/servicios/gerente.service';

@Component({
  selector: 'app-buscar-gerente',
  templateUrl: './buscar-gerente.component.html',
  styleUrls: ['./buscar-gerente.component.css']
})
export class BuscarGerenteComponent implements OnInit {

  listadoRegistros: ModeloGerente[] = [];

  constructor(private servicioGerente: GerenteService) { }

  ngOnInit(): void {
    this.obtenerListadoGerentes();
  }

  obtenerListadoGerentes(){
    this.servicioGerente.obtenerRegistros().subscribe((datos: ModeloGerente[])=>{
      this.listadoRegistros = datos;
    })
  }

}
