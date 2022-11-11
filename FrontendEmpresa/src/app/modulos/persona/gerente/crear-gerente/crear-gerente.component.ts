import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloEmpresa } from 'src/app/modelos/empresa.modelo';
import { ModeloGerente } from 'src/app/modelos/gerente.modelo';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { EmpresaService } from 'src/app/servicios/empresa.service';
import { GerenteService } from 'src/app/servicios/gerente.service';
import { PersonaService } from 'src/app/servicios/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-gerente',
  templateUrl: './crear-gerente.component.html',
  styleUrls: ['./crear-gerente.component.css']
})
export class CrearGerenteComponent implements OnInit {

  listadoRegistros: ModeloPersona[] = [];
  listadoRegistrosEmpresa: ModeloEmpresa[] = [];

  fgValidador: FormGroup = this.fb.group({
    'empresaId': ['', [Validators.required]],
    'tipo_cargo': ['', [Validators.required]],
    'personaId': ['',[Validators.required]],
  });

  constructor(private fb: FormBuilder,
    private servicioPersona: PersonaService,
    private servicioEmpresa: EmpresaService,
    private servicioGerente: GerenteService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerListadoPersonas();
    this.obtenerListadoEmpresas();
  }

  guardarGerente(){
    let empresaId = this.fgValidador.controls['empresaId'].value;
    let tipo_cargo = this.fgValidador.controls['tipo_cargo'].value;
    let personaId = this.fgValidador.controls['personaId'].value;
    let ger = new ModeloGerente();
    ger.empresaId = empresaId;
    ger.tipo_cargo = tipo_cargo;
    ger.personaId = personaId;
    this.servicioGerente.crearGerente(ger).subscribe((datos:ModeloGerente)=>{
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
      this.router.navigate(["/persona/listar-gerente"]);
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
