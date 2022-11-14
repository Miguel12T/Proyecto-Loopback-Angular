import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloServicio } from 'src/app/modelos/servicio.modelo';
import { ModeloEmpresa } from 'src/app/modelos/empresa.modelo';
import { ModeloTiposervicio } from 'src/app/modelos/tiposervicio.modelo';
import { TiposervicioService } from 'src/app/servicios/tiposervicio.service';
import { EmpresaService } from 'src/app/servicios/empresa.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-eliminar-servicio',
  templateUrl: './eliminar-servicio.component.html',
  styleUrls: ['./eliminar-servicio.component.css']
})
export class EliminarServicioComponent implements OnInit {

  id:string='';
  fgValidador: FormGroup= this.fb.group({
    'id':['',[Validators.required]],
    'empresaId':['',[Validators.required]],
    'tipoServicioId':['',[Validators.required]]
  })

  listadoTiposervicios: ModeloTiposervicio[] = [];
  listadoRegistrosEmpresa: ModeloEmpresa[] = [];

  constructor(private fb:FormBuilder, 
    private tiposervicio: TiposervicioService,
    private servicioEmpresa: EmpresaService,
    private servicio: ServicioService,
    private router: Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerlistadoTiposervicios();
    this.obtenerListadoEmpresas();
    this.id=this.route.snapshot.params["id"];
    this.BuscarServicio();

  }

  BuscarServicio(){
    this.servicio.ObtenerServicioPorId(this.id).subscribe((datos:ModeloServicio)=>{
      this.fgValidador.controls["id"].setValue(this.id);
      this.fgValidador.controls["empresaId"].setValue(datos.empresaId);
      this.fgValidador.controls["tipoServicioId"].setValue(datos.tipoServicioId);
    })
  }
  
  EliminarServicio(){
    let tiposervicioId= this.fgValidador.controls['tipoServicioId'].value;
    let empresaId = this.fgValidador.controls['empresaId'].value;

    let ser=new ModeloServicio();
    ser.empresaId= empresaId;
    ser.tipoServicioId=tiposervicioId;
    ser.id=this.id;

    this.servicio.EliminarServicio(this.id).subscribe((datos:ModeloServicio)=>{
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
        title: 'Eliminado correctamente!!',
      })
      this.router.navigate(["/empresa-ser/listar-servicio"]);
    }, (error: any)=>{
      //alert("Error al actualiza servicio")
    })
  }

  obtenerlistadoTiposervicios(){
    this.tiposervicio.ObtenerTiposervicio().subscribe((datos: ModeloTiposervicio[])=>{
      this.listadoTiposervicios = datos;
    })
  }

  obtenerListadoEmpresas(){
    this.servicioEmpresa.obtenerRegistros().subscribe((datos: ModeloEmpresa[])=>{
      this.listadoRegistrosEmpresa = datos;
    })
  }

}
