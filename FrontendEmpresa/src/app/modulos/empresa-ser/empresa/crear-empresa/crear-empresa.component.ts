import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloEmpresa } from 'src/app/modelos/empresa.modelo';
import { EmpresaService } from 'src/app/servicios/empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.component.html',
  styleUrls: ['./crear-empresa.component.css']
})
export class CrearEmpresaComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({
    'nombre': ['',[Validators.required]],
    'direccion': ['',[Validators.required]],
    'email': ['',[Validators.required]],
    'telefono': ['', [Validators.required]],
    'nit': ['',[Validators.required]],
  });

  constructor(private fb: FormBuilder,
    private servicioEmpresa: EmpresaService,
    private router: Router) { }

  ngOnInit(): void {
  }

  guardarEmpresa(){
    let nombre = this.fgValidador.controls['nombre'].value;
    let direccion = this.fgValidador.controls['direccion'].value;
    let email = this.fgValidador.controls['email'].value.toString();
    let telefono = this.fgValidador.controls['telefono'].value.toString();
    let nit = this.fgValidador.controls['nit'].value;
    let emp = new ModeloEmpresa();
    emp.nombre = nombre;
    emp.direccion = direccion;
    emp.email = email;
    emp.nit =nit;
    emp.telefono = telefono;
    this.servicioEmpresa.crearEmpresa(emp).subscribe((datos:ModeloEmpresa)=>{
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
      this.router.navigate(["/empresa-ser/listar-empresa"]);
    }, (error: any)=>{
      alert("Error al guardar")
    })
  }

}
