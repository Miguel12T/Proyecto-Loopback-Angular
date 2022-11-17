import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloCliente } from 'src/app/modelos/cliente.modelo';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PersonaService } from 'src/app/servicios/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  listadoRegistros: ModeloPersona[] = [];

  fgValidador: FormGroup = this.fb.group({
    'telefono': ['', [Validators.required]],
    'personaId': ['',[Validators.required]],
  });

  constructor(private fb: FormBuilder,
    private servicioPersona: PersonaService,
    private servicioCliente: ClienteService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerListadoPersonas();
  }

  guardarCliente(){
    let telefono = this.fgValidador.controls['telefono'].value.toString();
    let personaId = this.fgValidador.controls['personaId'].value;
    let c = new ModeloCliente();
    c.telefono = telefono;
    c.personaId = personaId;
    this.servicioCliente.crearCliente(c).subscribe((datos:ModeloCliente)=>{
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Agregado Correctamente!!',
      })
      this.router.navigate(["/persona/listar-cliente"]);
    }, (error: any)=>{
      alert("Error al guardar")
    })
  }

  obtenerListadoPersonas(){
    this.servicioPersona.obtenerRegistrosEstadoTrue().subscribe((datos: ModeloPersona[])=>{
      this.listadoRegistros = datos;
    })
  }

}
