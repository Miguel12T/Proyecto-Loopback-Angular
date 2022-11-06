import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { LoguinComponent } from './loguin/loguin.component';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { EditarClaveComponent } from './cambio-clave/editar-clave/editar-clave.component';


@NgModule({
  declarations: [
    LoguinComponent,
    CambioClaveComponent,
    RecuperarClaveComponent,
    EditarClaveComponent,

  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule
  ]
})
export class SeguridadModule { }
