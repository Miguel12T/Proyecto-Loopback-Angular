import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { LoguinComponent } from './loguin/loguin.component';

const routes: Routes = [
  {
    path : "login",
    component : LoguinComponent
  },
  {
    path : "cerrar-sesion",
    component : CerrarSesionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
