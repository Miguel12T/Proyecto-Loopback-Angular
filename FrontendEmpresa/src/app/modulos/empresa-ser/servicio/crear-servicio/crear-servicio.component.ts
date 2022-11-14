import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloServicio } from 'src/app/modelos/servicio.modelo';
import { ModeloEmpresa } from 'src/app/modelos/empresa.modelo';
import { ModeloTiposervicio } from 'src/app/modelos/tiposervicio.modelo';
import { TiposervicioService } from 'src/app/servicios/tiposervicio.service';
import { EmpresaService } from 'src/app/servicios/empresa.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css']
})
export class CrearServicioComponent implements OnInit {

  listadoTiposervicios: ModeloTiposervicio[] = [];
  listadoRegistrosEmpresa: ModeloEmpresa[] = [];

  fgValidador: FormGroup= this.fb.group({
    'empresaId':['',[Validators.required]],
    'tipoServicioId':['',[Validators.required]]
  })

  constructor(private fb:FormBuilder, 
    private tiposervicio: TiposervicioService,
    private servicioEmpresa: EmpresaService,
    private servicio: ServicioService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerlistadoTiposervicios();
    this.obtenerListadoEmpresas();
  }

  guardarServicio(){
    let tiposervicioId= this.fgValidador.controls['tipoServicioId'].value;
    let empresaId = this.fgValidador.controls['empresaId'].value;

    let ser=new ModeloServicio();
    ser.empresaId= empresaId;
    ser.tipoServicioId=tiposervicioId;

    this.servicio.CrearServicio(ser).subscribe((datos:ModeloServicio)=>{
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
      this.router.navigate(["/empresa-ser/listar-servicio"]);
    }, (error: any)=>{
      alert("Error al guardar servicio")
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
