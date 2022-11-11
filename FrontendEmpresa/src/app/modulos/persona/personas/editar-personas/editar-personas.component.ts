import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { PersonaService } from 'src/app/servicios/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-personas',
  templateUrl: './editar-personas.component.html',
  styleUrls: ['./editar-personas.component.css']
})
export class EditarPersonasComponent implements OnInit {

  id:string = '';

  fgValidador: FormGroup = this.fb.group({
    'id':['',[Validators.required]],
    'nombre': ['', [Validators.required]],
    'apellidos': ['', [Validators.required]],
    'identificacion': ['',[Validators.required]],
    'fecha_nacimiento': ['',[Validators.required]],
    'email': ['',[Validators.required]],
    'estado':['',[Validators.required]]
  });

  constructor(private fb: FormBuilder,
    private servicioPersona: PersonaService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.buscarPersona();
  }

  buscarPersona(){
    this.servicioPersona.obtenerRegistroPorId(this.id).subscribe((datos: ModeloPersona) =>{
      this.fgValidador.controls["id"].setValue(this.id);
      this.fgValidador.controls["nombre"].setValue(datos.nombre);
      this.fgValidador.controls["apellidos"].setValue(datos.apellidos);
      this.fgValidador.controls["identificacion"].setValue(datos.identificacion);
      this.fgValidador.controls["fecha_nacimiento"].setValue(datos.fecha_nacimiento);
      this.fgValidador.controls["email"].setValue(datos.email);
      this.fgValidador.controls["estado"].setValue(datos.estado);
    });
  }

  editarPersona(){
    let nombre = this.fgValidador.controls['nombre'].value;
    let apellidos = this.fgValidador.controls['apellidos'].value;
    let identificacion = this.fgValidador.controls['identificacion'].value;
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
    p.id = this.id;
    this.servicioPersona.actualizarPersona(p).subscribe((datos:ModeloPersona)=>{
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
        this.router.navigate(["/persona/listar-persona"]);
    }, (error: any)=>{
      alert("Error al guardar")
    })
  }

}

