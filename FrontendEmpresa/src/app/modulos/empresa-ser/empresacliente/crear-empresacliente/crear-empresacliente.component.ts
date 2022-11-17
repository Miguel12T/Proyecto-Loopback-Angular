import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloCliente } from 'src/app/modelos/cliente.modelo';
import { ModeloEmpresa } from 'src/app/modelos/empresa.modelo';
import { ModeloEmpresaCliente } from 'src/app/modelos/empresacliente.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { EmpresaService } from 'src/app/servicios/empresa.service';
import { EmpresaclienteService } from 'src/app/servicios/empresacliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-empresacliente',
  templateUrl: './crear-empresacliente.component.html',
  styleUrls: ['./crear-empresacliente.component.css']
})
export class CrearEmpresaclienteComponent implements OnInit {

  listadoCliente: ModeloCliente[] = [];
  listadoEmpresa: ModeloEmpresa[] = [];

  fgValidador: FormGroup= this.fb.group({
    'empresaId':['',[Validators.required]],
    'clienteId':['',[Validators.required]]
  })

  constructor(private fb:FormBuilder, 
    private servicioEmpresa: EmpresaService,
    private servicioCliente: ClienteService,
    private servicioEmpresaCliente: EmpresaclienteService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerlistadoCliente();
    this.obtenerListadoEmpresas();
  }

  GuardarEmpresaCli(){
    let clienteId = this.fgValidador.controls['clienteId'].value;
    let empresaId = this.fgValidador.controls['empresaId'].value;
    let emprecli = new ModeloEmpresaCliente();
    emprecli.clienteId = clienteId;
    emprecli.empresaId = empresaId;
    this.servicioEmpresaCliente.CrearEmpresacliente(emprecli).subscribe((datos:ModeloEmpresaCliente)=>{
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
      this.router.navigate(["/empresa-ser/listar-empresacliente"]);
    }, (error: any)=>{
      alert("Error al guardar")
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
