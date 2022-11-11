import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import * as cryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loguin',
  templateUrl: './loguin.component.html',
  styleUrls: ['./loguin.component.css']
})
export class LoguinComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({
    'usuario': ['',[Validators.required]],
    'clave': ['',[Validators.required]]
  });

  constructor(private fb: FormBuilder, 
    private servicioSeguridad: SeguridadService,
    private router: Router) { }

  ngOnInit(): void {}

  identificarUsuario(){
    let usuario = this.fgValidador.controls["usuario"].value;
    let clave = this.fgValidador.controls["clave"].value;
    let claveCifrada = cryptoJS.MD5(clave).toString();
    this.servicioSeguridad.Identificar(usuario, claveCifrada).subscribe((datos:any)=> {
      this.servicioSeguridad.almacenarSesion(datos);
      this.router.navigate(['/inicio']);
    }, (error: any)=>{
      alert("Datos Incorrectos")
    })
    
  }

}
