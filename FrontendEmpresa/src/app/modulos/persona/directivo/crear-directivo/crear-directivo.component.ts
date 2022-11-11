import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloDirectivo } from 'src/app/modelos/directivo.modelo';
import { ModeloEmpleado } from 'src/app/modelos/empleado.model';
import { DirectivoService } from 'src/app/servicios/directivo.service';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-directivo',
  templateUrl: './crear-directivo.component.html',
  styleUrls: ['./crear-directivo.component.css']
})
export class CrearDirectivoComponent implements OnInit {

  listadoRegistrosEmpleado: ModeloEmpleado[] = [];

  fgValidador: FormGroup = this.fb.group({
    'empleadoId': ['', [Validators.required]],
    'categoria': ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder,
    private servicioDirectivo: DirectivoService,
    private servicioEmpleado: EmpleadoService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerListadoEmpleados();
  }

  guardarDirectivo(){
    let empleadoId = this.fgValidador.controls['empleadoId'].value;
    let categoria = this.fgValidador.controls['categoria'].value;
    let dir = new ModeloDirectivo();
    dir.empleadoId = empleadoId;
    dir.categoria = categoria;
    this.servicioDirectivo.crearDirectivo(dir).subscribe((datos:ModeloDirectivo)=>{
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
      this.router.navigate(["/persona/listar-directivo"]);
    }, (error: any)=>{
      alert("Error al guardar")
    })
  }

  obtenerListadoEmpleados(){
    this.servicioEmpleado.obtenerRegistros().subscribe((datos: ModeloEmpleado[])=>{
      this.listadoRegistrosEmpleado = datos;
    })
  }

}
