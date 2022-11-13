import { Component, OnInit } from '@angular/core';
import { ModeloTiposervicio } from 'src/app/modelos/tiposervicio.modelo';
import { TiposervicioService } from 'src/app/servicios/tiposervicio.service';

@Component({
  selector: 'app-buscar-tipo',
  templateUrl: './buscar-tipo.component.html',
  styleUrls: ['./buscar-tipo.component.css']
})
export class BuscarTipoComponent implements OnInit {

  listadoTiposervicio: ModeloTiposervicio[] = [];

  constructor(private tiposervicioServicio: TiposervicioService) { }

  ngOnInit(): void {
    this.ObetenerlistadoTiposervicio();
  }
  ObetenerlistadoTiposervicio(){
    this.tiposervicioServicio.ObtenerTiposervicio().subscribe((datos: ModeloTiposervicio[])=>{
      this.listadoTiposervicio=datos;
    })
  } 
}
