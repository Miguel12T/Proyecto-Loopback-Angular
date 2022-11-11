import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { PersonaService } from 'src/app/servicios/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-personas',
  templateUrl: './crear-personas.component.html',
  styleUrls: ['./crear-personas.component.css']
})
export class CrearPersonasComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({
    'nombre': ['', [Validators.required]],
    'apellidos': ['', [Validators.required]],
    'identificacion': ['',[Validators.required]],
    'fecha_nacimiento': ['',[Validators.required]],
    'email': ['',[Validators.required]],
    'estado':['',[Validators.required]]
  });

  constructor(private fb: FormBuilder,
    private servicioPersona: PersonaService,
    private router: Router) { }

  ngOnInit(): void {
  }

  guardarPersona(){
    let nombre = this.fgValidador.controls['nombre'].value;
    let apellidos = this.fgValidador.controls['apellidos'].value;
    let identificacion = this.fgValidador.controls['identificacion'].value.toString();
    let email = this.fgValidador.controls['email'].value;
    let fecha_nacimiento = this.fgValidador.controls['fecha_nacimiento'].value.toString();
    let estado = this.fgValidador.controls['estado'].value;
    let p = new ModeloPersona();
    p.nombre = nombre;
    p.apellidos = apellidos;
    p.identificacion = identificacion;
    p.fecha_nacimiento = fecha_nacimiento;
    p.email = email;
    p.estado = estado;
    this.servicioPersona.crearPersona(p).subscribe((datos:ModeloPersona)=>{
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
      this.router.navigate(["/persona/listar-persona"]);
    }, (error: any)=>{
      alert("Error al guardar")
    })
  }

}
