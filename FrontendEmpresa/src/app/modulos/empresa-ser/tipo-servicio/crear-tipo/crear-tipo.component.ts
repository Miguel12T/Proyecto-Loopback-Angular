import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloTiposervicio } from 'src/app/modelos/tiposervicio.modelo';
import { TiposervicioService } from 'src/app/servicios/tiposervicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-tipo',
  templateUrl: './crear-tipo.component.html',
  styleUrls: ['./crear-tipo.component.css']
})
export class CrearTipoComponent implements OnInit {

  fgValidador: FormGroup= this.fb.group({
    'tipo':['',[Validators.required]]
  })
  constructor(private fb:FormBuilder, private tiposervicio: TiposervicioService,private router: Router) { }

  ngOnInit(): void {
  }

  GuardarTipo(){
    let tipo =this.fgValidador.controls["tipo"].value;
    let s=new ModeloTiposervicio();
    s.tipo= tipo;
    this.tiposervicio.CrearTiposervicio(s).subscribe((datos: ModeloTiposervicio)=>{
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
      this.router.navigate(["/empresa-ser/listar-tipo"]);
    }, (error: any)=>{
      alert("Error al guardar tipo servicio")
    })
  }
}
