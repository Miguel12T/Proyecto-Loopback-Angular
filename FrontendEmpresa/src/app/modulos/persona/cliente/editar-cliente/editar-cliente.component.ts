import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloCliente } from 'src/app/modelos/cliente.modelo';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PersonaService } from 'src/app/servicios/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  listadoRegistros: ModeloPersona[] = [];
  id:string = '';

  fgValidador: FormGroup = this.fb.group({
    'id': ['',[Validators.required]],
    'telefono': ['', [Validators.required]],
    'personaId': ['',[Validators.required]],
  });

  constructor(private fb: FormBuilder,
    private servicioPersona: PersonaService,
    private servicioCliente: ClienteService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerListadoPersonas();
    this.id = this.route.snapshot.params["id"];
    this.buscarCliente();
  }

  buscarCliente(){
    this.servicioCliente.obtenerRegistroPorId(this.id).subscribe((datos: ModeloCliente) =>{
      this.fgValidador.controls["id"].setValue(this.id);
      this.fgValidador.controls["telefono"].setValue(datos.telefono);
      this.fgValidador.controls["personaId"].setValue(datos.personaId);
    });
  }

  editarCliente(){
    let telefono = this.fgValidador.controls['telefono'].value.toString();
    let personaId = this.fgValidador.controls['personaId'].value;
    let c = new ModeloCliente();
    c.telefono = telefono;
    c.personaId = personaId;
    c.id = this.id;
    this.servicioCliente.actualizarCliente(c).subscribe((datos:ModeloCliente)=>{
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
        title: 'Actualizado Correctamente!!',
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
