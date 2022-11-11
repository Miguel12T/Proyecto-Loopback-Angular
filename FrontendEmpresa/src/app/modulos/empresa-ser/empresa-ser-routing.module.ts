import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarEmpresaComponent } from './empresa/buscar-empresa/buscar-empresa.component';
import { CrearEmpresaComponent } from './empresa/crear-empresa/crear-empresa.component';
import { EditarEmpresaComponent } from './empresa/editar-empresa/editar-empresa.component';

const routes: Routes = [
  {
    path:'listar-empresa',
    component: BuscarEmpresaComponent
  },
  {
    path:'crear-empresa',
    component: CrearEmpresaComponent
  },
  {
    path:'editar-empresa/:id',
    component: EditarEmpresaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaSerRoutingModule { }
