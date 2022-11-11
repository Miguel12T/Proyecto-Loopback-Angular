import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloDirectivo } from 'src/app/modelos/directivo.modelo';
import { ModeloEmpleado } from 'src/app/modelos/empleado.model';
import { DirectivoService } from 'src/app/servicios/directivo.service';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-directivo',
  templateUrl: './editar-directivo.component.html',
  styleUrls: ['./editar-directivo.component.css']
})
export class EditarDirectivoComponent implements OnInit {

  listadoRegistrosEmpleado: ModeloEmpleado[] = [];
  id:string = '';

  fgValidador: FormGroup = this.fb.group({
    'id': ['',[Validators.required]],
    'empleadoId': ['', [Validators.required]],
    'categoria': ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder,
    private servicioDirectivo: DirectivoService,
    private servicioEmpleado: EmpleadoService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerListadoEmpleados();
    this.id = this.route.snapshot.params["id"];
    this.buscarDirectivo();
  }

  buscarDirectivo(){
    this.servicioDirectivo.obtenerRegistroPorId(this.id).subscribe((datos: ModeloDirectivo) =>{
      this.fgValidador.controls["id"].setValue(this.id);
      this.fgValidador.controls["empleadoId"].setValue(datos.empleadoId);
      this.fgValidador.controls["categoria"].setValue(datos.categoria);
    });
  }

  editarDirectivo(){
    let empleadoId = this.fgValidador.controls['empleadoId'].value;
    let categoria = this.fgValidador.controls['categoria'].value;
    let dir = new ModeloDirectivo();
    dir.empleadoId = empleadoId;
    dir.categoria = categoria;
    dir.id = this.id;
    this.servicioDirectivo.actualizarDirectivo(dir).subscribe((datos:ModeloDirectivo)=>{
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
