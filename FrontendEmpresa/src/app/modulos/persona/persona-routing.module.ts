import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarEmpleadoComponent } from './empleado/buscar-empleado/buscar-empleado.component';
import { CrearEmpleadoComponent } from './empleado/crear-empleado/crear-empleado.component';
import { EditarEmpleadoComponent } from './empleado/editar-empleado/editar-empleado.component';

const routes: Routes = [
  {
    path:'crear-empleado',
    component: CrearEmpleadoComponent
  },
  {
    path:'editar-empleado',
    component: EditarEmpleadoComponent
  },
  {
    path:'buscar-empleado',
    component: BuscarEmpleadoComponent
  },
  {
    path:'eliminar-empleado',
    component: EditarEmpleadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonaRoutingModule { }
