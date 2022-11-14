import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarEmpresaComponent } from './empresa/buscar-empresa/buscar-empresa.component';
import { CrearEmpresaComponent } from './empresa/crear-empresa/crear-empresa.component';
import { EditarEmpresaComponent } from './empresa/editar-empresa/editar-empresa.component';
import { BuscarServicioComponent } from './servicio/buscar-servicio/buscar-servicio.component';
import { CrearServicioComponent } from './servicio/crear-servicio/crear-servicio.component';
import { EditarServicioComponent } from './servicio/editar-servicio/editar-servicio.component';
import { EliminarServicioComponent } from './servicio/eliminar-servicio/eliminar-servicio.component';
import { ServicioComponent } from './servicio/servicio.component';
import { BuscarTipoComponent } from './tipo-servicio/buscar-tipo/buscar-tipo.component';
import { CrearTipoComponent } from './tipo-servicio/crear-tipo/crear-tipo.component';
import { EditarTipoComponent } from './tipo-servicio/editar-tipo/editar-tipo.component';
import { EliminarTipoComponent } from './tipo-servicio/eliminar-tipo/eliminar-tipo.component';

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
  {
    path:'listar-tipo',
    component: BuscarTipoComponent
  },
  {
    path:'crear-tipo',
    component: CrearTipoComponent
  },
  {
    path:'editar-tipo/:id',
    component: EditarTipoComponent
  },
  {
    path:'eliminar-tipo/:id',
    component: EliminarTipoComponent
  },
  {
    path:'listar-servicio',
    component: BuscarServicioComponent
  },
  {
    path:'editar-servicio/:id',
    component: EditarServicioComponent
  },
  {
    path:'crear-servicio',
    component: CrearServicioComponent
  },
  {
    path:'editar-servicio',
    component: EditarServicioComponent
  },
  {
    path:'eliminar-servicio/:id',
    component: EliminarServicioComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaSerRoutingModule { }
