import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloEmpleado } from 'src/app/modelos/empleado.model';
import { ModeloEmpresa } from 'src/app/modelos/empresa.modelo';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import { EmpresaService } from 'src/app/servicios/empresa.service';
import { PersonaService } from 'src/app/servicios/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {

  listadoRegistros: ModeloPersona[] = [];
  listadoRegistrosEmpresa: ModeloEmpresa[] = [];
  id:string = '';

  fgValidador: FormGroup = this.fb.group({
    'id': ['',[Validators.required]],
    'empresaId': ['', [Validators.required]],
    'sueldo_bruto': ['', [Validators.required]],
    'personaId': ['',[Validators.required]],
  });

  constructor(private fb: FormBuilder,
    private servicioPersona: PersonaService,
    private servicioEmpresa: EmpresaService,
    private servicioEmpleado: EmpleadoService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerListadoPersonas();
    this.obtenerListadoEmpresas();
    this.id = this.route.snapshot.params["id"];
    this.buscarEmpleado();
  }

  buscarEmpleado(){
    this.servicioEmpleado.obtenerRegistroPorId(this.id).subscribe((datos: ModeloEmpleado) =>{
      this.fgValidador.controls["id"].setValue(this.id);
      this.fgValidador.controls["empresaId"].setValue(datos.empresaId);
      this.fgValidador.controls["sueldo_bruto"].setValue(datos.sueldo_bruto);
      this.fgValidador.controls["personaId"].setValue(datos.personaId);
    });
  }

  editarEmpleado(){
    let empresaId = this.fgValidador.controls['empresaId'].value;
    let sueldo_bruto = this.fgValidador.controls['sueldo_bruto'].value;
    let personaId = this.fgValidador.controls['personaId'].value;
    let emp = new ModeloEmpleado();
    emp.empresaId = empresaId;
    emp.sueldo_bruto = sueldo_bruto;
    emp.personaId = personaId;
    emp.id = this.id;
    this.servicioEmpleado.actualizarEmpleado(emp).subscribe((datos:ModeloEmpleado)=>{
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
      this.router.navigate(["/persona/listar-empleado"]);
    }, (error: any)=>{
      alert("Error al guardar")
    })
  }

  obtenerListadoPersonas(){
    this.servicioPersona.obtenerRegistros().subscribe((datos: ModeloPersona[])=>{
      this.listadoRegistros = datos;
    })
  }

  obtenerListadoEmpresas(){
    this.servicioEmpresa.obtenerRegistros().subscribe((datos: ModeloEmpresa[])=>{
      this.listadoRegistrosEmpresa = datos;
    })
  }

}
