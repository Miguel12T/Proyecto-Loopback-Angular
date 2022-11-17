import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloCliente } from 'src/app/modelos/cliente.modelo';
import { ModeloEmpresa } from 'src/app/modelos/empresa.modelo';
import { ModeloEmpresaCliente } from 'src/app/modelos/empresacliente.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { EmpresaService } from 'src/app/servicios/empresa.service';
import { EmpresaclienteService } from 'src/app/servicios/empresacliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-empresacliente',
  templateUrl: './editar-empresacliente.component.html',
  styleUrls: ['./editar-empresacliente.component.css']
})
export class EditarEmpresaclienteComponent implements OnInit {

  id:string='';
  fgValidador: FormGroup= this.fb.group({
    'id':['',[Validators.required]],
    'clienteId':['',[Validators.required]],
    'empresaId':['',[Validators.required]]
  })

  listadoCliente: ModeloCliente[] = [];
  listadoEmpresa: ModeloEmpresa[] = [];


  constructor(private fb:FormBuilder, 
    private servicioEmpresa: EmpresaService,
    private servicioCliente: ClienteService,
    private servicioEmpresaCliente: EmpresaclienteService,
    private router: Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerlistadoCliente();
    this.obtenerListadoEmpresas();
    this.id=this.route.snapshot.params["id"];
    this.BuscarEmpresacli();
  }

  BuscarEmpresacli(){
    this.servicioEmpresaCliente.ObtenerEmpresaclientePorId(this.id).subscribe((datos:ModeloEmpresaCliente)=>{
      this.fgValidador.controls["id"].setValue(this.id);
      this.fgValidador.controls["clienteId"].setValue(datos.clienteId);
      this.fgValidador.controls["empresaId"].setValue(datos.empresaId);
    });
  }

  ActualizarEmpresaCli(){
    let clienteId = this.fgValidador.controls['clienteId'].value;
    let empresaId = this.fgValidador.controls['empresaId'].value;

    let emprecli = new ModeloEmpresaCliente();
    emprecli.clienteId = clienteId;
    emprecli.empresaId = empresaId;
    emprecli.id = this.id;
    this.servicioEmpresaCliente.ActualizarEmpresacliente(emprecli).subscribe((datos:ModeloEmpresaCliente)=>{
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
      this.router.navigate(["/empresa-ser/listar-empresacliente"]);
    }, (error: any)=>{
      alert("Error al actualizar")
    })
  }


  obtenerlistadoCliente(){
    this.servicioCliente.obtenerRegistros().subscribe((datos: ModeloCliente[])=>{
      this.listadoCliente = datos;
    })
  }

  obtenerListadoEmpresas(){
    this.servicioEmpresa.obtenerRegistros().subscribe((datos: ModeloEmpresa[])=>{
      this.listadoEmpresa = datos;
    })
  }

}
