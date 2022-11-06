import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './plantilla/error/error.component';
import { InicioComponent } from './plantilla/inicio/inicio.component';

const routes: Routes = [
  {
    path:"inicio",  
    component:InicioComponent
  },
  {
    path:"",
    pathMatch:'full',
    redirectTo:'/inicio'
  },
  {
    path:'persona',
    loadChildren: () => import("./modulos/persona/persona.module").then(x => x.PersonaModule)
  },
  {
    path:'empresa-ser',
    loadChildren: () => import("./modulos/empresa-ser/empresa-ser.module").then(x => x.EmpresaSerModule)
  },
  {
    path:'seguridad',
    loadChildren: () => import("./modulos/seguridad/seguridad.module").then(x => x.SeguridadModule)
  },
  {
    path:'**',
    component:ErrorComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
