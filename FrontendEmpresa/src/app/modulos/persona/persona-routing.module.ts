import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarClienteComponent } from './cliente/buscar-cliente/buscar-cliente.component';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { BuscarDirectivoComponent } from './directivo/buscar-directivo/buscar-directivo.component';
import { CrearDirectivoComponent } from './directivo/crear-directivo/crear-directivo.component';
import { EditarDirectivoComponent } from './directivo/editar-directivo/editar-directivo.component';
import { BuscarEmpleadoComponent } from './empleado/buscar-empleado/buscar-empleado.component';
import { CrearEmpleadoComponent } from './empleado/crear-empleado/crear-empleado.component';
import { EditarEmpleadoComponent } from './empleado/editar-empleado/editar-empleado.component';
import { EliminarEmpleadoComponent } from './empleado/eliminar-empleado/eliminar-empleado.component';
import { BuscarGerenteComponent } from './gerente/buscar-gerente/buscar-gerente.component';
import { CrearGerenteComponent } from './gerente/crear-gerente/crear-gerente.component';
import { EditarGerenteComponent } from './gerente/editar-gerente/editar-gerente.component';
import { BuscarPersonasComponent } from './personas/buscar-personas/buscar-personas.component';
import { CrearPersonasComponent } from './personas/crear-personas/crear-personas.component';
import { EditarPersonasComponent } from './personas/editar-personas/editar-personas.component';

const routes: Routes = [
  {
    path:'listar-empleado',
    component: BuscarEmpleadoComponent
  },
  {
    path:'crear-empleado',
    component: CrearEmpleadoComponent
  },
  {
    path:'editar-empleado/:id',
    component: EditarEmpleadoComponent
  },
  {
    path:'eliminar-empleado',
    component: EliminarEmpleadoComponent
  },
  {
    path:'listar-persona',
    component: BuscarPersonasComponent
  },
  {
    path:'crear-persona',
    component: CrearPersonasComponent
  },
  {
    path:'editar-persona/:id',
    component: EditarPersonasComponent
  },
  {
    path:'listar-cliente',
    component: BuscarClienteComponent
  },
  {
    path:'crear-cliente',
    component: CrearClienteComponent
  },
  {
    path:'editar-cliente/:id',
    component: EditarClienteComponent
  },
  {
    path:'listar-gerente',
    component: BuscarGerenteComponent
  },
  {
    path:'crear-gerente',
    component: CrearGerenteComponent
  },
  {
    path:'editar-gerente/:id',
    component: EditarGerenteComponent
  },
  {
    path:'listar-directivo',
    component: BuscarDirectivoComponent
  },
  {
    path:'crear-directivo',
    component: CrearDirectivoComponent
  },
  {
    path:'editar-directivo/:id',
    component: EditarDirectivoComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonaRoutingModule { }
