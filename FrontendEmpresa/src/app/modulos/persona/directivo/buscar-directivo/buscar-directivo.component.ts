import { Component, OnInit } from '@angular/core';
import { ModeloDirectivo } from 'src/app/modelos/directivo.modelo';
import { DirectivoService } from 'src/app/servicios/directivo.service';

@Component({
  selector: 'app-buscar-directivo',
  templateUrl: './buscar-directivo.component.html',
  styleUrls: ['./buscar-directivo.component.css']
})
export class BuscarDirectivoComponent implements OnInit {

  listadoRegistros: ModeloDirectivo[] = [];
  

  constructor(private servicioDirectivo: DirectivoService,
    ) { }

  ngOnInit(): void {
    this.obtenerListadoDirectivos();
  }

  obtenerListadoDirectivos(){
    this.servicioDirectivo.obtenerRegistros().subscribe((datos: ModeloDirectivo[])=>{
      this.listadoRegistros = datos;
    })
  }

}
