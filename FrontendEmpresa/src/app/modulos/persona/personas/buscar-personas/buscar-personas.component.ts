import { Component, OnInit } from '@angular/core';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-buscar-personas',
  templateUrl: './buscar-personas.component.html',
  styleUrls: ['./buscar-personas.component.css']
})
export class BuscarPersonasComponent implements OnInit {

  listadoRegistros: ModeloPersona[] = [];

  constructor(private personaServicio: PersonaService) { }

  ngOnInit(): void {
    this.obtenerListadoPersonas();
  }

  obtenerListadoPersonas(){
    this.personaServicio.obtenerRegistros().subscribe((datos: ModeloPersona[])=>{
      this.listadoRegistros = datos;
    })
  }

}
