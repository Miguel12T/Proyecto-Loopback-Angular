import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloEmpresa } from 'src/app/modelos/empresa.modelo';
import { ModeloGerente } from 'src/app/modelos/gerente.modelo';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { EmpresaService } from 'src/app/servicios/empresa.service';
import { GerenteService } from 'src/app/servicios/gerente.service';
import { PersonaService } from 'src/app/servicios/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-gerente',
  templateUrl: './editar-gerente.component.html',
  styleUrls: ['./editar-gerente.component.css']
})
export class EditarGerenteComponent implements OnInit {

  listadoRegistros: ModeloPersona[] = [];
  listadoRegistrosEmpresa: ModeloEmpresa[] = [];
  id:string = '';

  fgValidador: FormGroup = this.fb.group({
    'id': ['',[Validators.required]],
    'empresaId': ['', [Validators.required]],
    'tipo_cargo': ['', [Validators.required]],
    'personaId': ['',[Validators.required]],
  });

  constructor(private fb: FormBuilder,
    private servicioPersona: PersonaService,
    private servicioEmpresa: EmpresaService,
    private servicioGerente: GerenteService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerListadoPersonas();
    this.obtenerListadoEmpresas();
    this.id = this.route.snapshot.params["id"];
    this.buscarCliente();
  }

  buscarCliente(){
    this.servicioGerente.obtenerRegistroPorId(this.id).subscribe((datos: ModeloGerente) =>{
      this.fgValidador.controls["id"].setValue(this.id);
      this.fgValidador.controls["empresaId"].setValue(datos.empresaId);
      this.fgValidador.controls["tipo_cargo"].setValue(datos.tipo_cargo);
      this.fgValidador.controls["personaId"].setValue(datos.personaId);
    });
  }

  editarGerente(){
    let empresaId = this.fgValidador.controls['empresaId'].value;
    let tipo_cargo = this.fgValidador.controls['tipo_cargo'].value;
    let personaId = this.fgValidador.controls['personaId'].value;
    let ger = new ModeloGerente();
    ger.empresaId = empresaId;
    ger.tipo_cargo = tipo_cargo;
    ger.personaId = personaId;
    ger.id = this.id;
    this.servicioGerente.actualizarGerente(ger).subscribe((datos:ModeloGerente)=>{
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
      this.router.navigate(["/persona/listar-gerente"]);
    }, (error: any)=>{
      alert("Error al guardar")
    })
  }

  obtenerListadoPersonas(){
    this.servicioPersona.obtenerRegistrosEstadoTrue().subscribe((datos: ModeloPersona[])=>{
      this.listadoRegistros = datos;
    })
  }

  obtenerListadoEmpresas(){
    this.servicioEmpresa.obtenerRegistros().subscribe((datos: ModeloEmpresa[])=>{
      this.listadoRegistrosEmpresa = datos;
    })
  }

}
