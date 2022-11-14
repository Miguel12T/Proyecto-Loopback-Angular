import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloTiposervicio } from 'src/app/modelos/tiposervicio.modelo';
import { TiposervicioService } from 'src/app/servicios/tiposervicio.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-eliminar-tipo',
  templateUrl: './eliminar-tipo.component.html',
  styleUrls: ['./eliminar-tipo.component.css']
})
export class EliminarTipoComponent implements OnInit {

  id:string='';
  fgValidador: FormGroup= this.fb.group({
    'id':['',[Validators.required]],
    'tipo':['',[Validators.required]]
  })

  constructor(private fb:FormBuilder, private tiposervicio: TiposervicioService,private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params["id"];
    this.BuscarTipo();
  }

  BuscarTipo(){
    this.tiposervicio.ObtenerTiposervicioPorId(this.id).subscribe((datos: ModeloTiposervicio) =>{
      this.fgValidador.controls["id"].setValue(this.id);
      this.fgValidador.controls["tipo"].setValue(datos.tipo);
    });
  }

  EliminarTipo(){
    let tipo =this.fgValidador.controls["tipo"].value;
    let s=new ModeloTiposervicio();
    s.tipo= tipo;
    s.id=this.id;
    this.tiposervicio.EliminarTiposervicio(this.id).subscribe((datos: ModeloTiposervicio)=>{
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
        title: 'Eliminado Correctamente!!',
      })
      this.router.navigate(["/empresa-ser/listar-tipo"]);
    }, (error: any)=>{
      //alert("Error al actualizar tipo servicio")
    })
  }
}
