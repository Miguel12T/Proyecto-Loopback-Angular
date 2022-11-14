import { Component, OnInit } from '@angular/core';
import { ModeloServicio } from 'src/app/modelos/servicio.modelo';
import { ServicioService } from 'src/app/servicios/servicio.service';

@Component({
  selector: 'app-buscar-servicio',
  templateUrl: './buscar-servicio.component.html',
  styleUrls: ['./buscar-servicio.component.css']
})
export class BuscarServicioComponent implements OnInit {

  listadoServicio:ModeloServicio[]=[];

  constructor(private servicioServicio: ServicioService) { }

  ngOnInit(): void {
    this.ObetenerlistadoServicio();
  }

  ObetenerlistadoServicio(){
    this.servicioServicio.ObtenerServicio().subscribe((datos: ModeloServicio[])=>{
      this.listadoServicio=datos;
    })
  } 
}
