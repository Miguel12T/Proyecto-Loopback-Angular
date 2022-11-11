import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloEmpresa } from 'src/app/modelos/empresa.modelo';
import { EmpresaService } from 'src/app/servicios/empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css']
})
export class EditarEmpresaComponent implements OnInit {

  id:string = '';

  fgValidador: FormGroup = this.fb.group({
    'id': ['',[Validators.required]],
    'nombre': ['',[Validators.required]],
    'direccion': ['',[Validators.required]],
    'email': ['',[Validators.required]],
    'telefono': ['', [Validators.required]],
    'nit': ['',[Validators.required]],
  });

  constructor(private fb: FormBuilder,
    private servicioEmpresa: EmpresaService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.buscarEmpresa();
  }

  buscarEmpresa(){
    this.servicioEmpresa.obtenerRegistroPorId(this.id).subscribe((datos: ModeloEmpresa) =>{
      this.fgValidador.controls["id"].setValue(this.id);
      this.fgValidador.controls["nombre"].setValue(datos.nombre);
      this.fgValidador.controls["direccion"].setValue(datos.direccion);
      this.fgValidador.controls["email"].setValue(datos.email);
      this.fgValidador.controls["telefono"].setValue(datos.telefono);
      this.fgValidador.controls["nit"].setValue(datos.nit);
    });
  }

  editarEmpresa(){
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
    emp.id = this.id;
    this.servicioEmpresa.actualizarEmpresa(emp).subscribe((datos:ModeloEmpresa)=>{
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
      this.router.navigate(["/empresa-ser/listar-empresa"]);
    }, (error: any)=>{
      alert("Error al guardar")
    })
  }


}
