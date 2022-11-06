import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonaRoutingModule } from './persona-routing.module';
import { EmpleadoComponent } from './empleado/empleado.component';
import { GerenteComponent } from './gerente/gerente.component';
import { ClienteComponent } from './cliente/cliente.component';
import { DirectivoComponent } from './directivo/directivo.component';
import { CrearEmpleadoComponent } from './empleado/crear-empleado/crear-empleado.component';
import { EditarEmpleadoComponent } from './empleado/editar-empleado/editar-empleado.component';
import { EliminarEmpleadoComponent } from './empleado/eliminar-empleado/eliminar-empleado.component';
import { BuscarEmpleadoComponent } from './empleado/buscar-empleado/buscar-empleado.component';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { EliminarClienteComponent } from './cliente/eliminar-cliente/eliminar-cliente.component';
import { BuscarClienteComponent } from './cliente/buscar-cliente/buscar-cliente.component';
import { BuscarDirectivoComponent } from './directivo/buscar-directivo/buscar-directivo.component';
import { EliminarDirectivoComponent } from './directivo/eliminar-directivo/eliminar-directivo.component';
import { EditarDirectivoComponent } from './directivo/editar-directivo/editar-directivo.component';
import { CrearDirectivoComponent } from './directivo/crear-directivo/crear-directivo.component';
import { CrearGerenteComponent } from './gerente/crear-gerente/crear-gerente.component';
import { EditarGerenteComponent } from './gerente/editar-gerente/editar-gerente.component';
import { EliminarGerenteComponent } from './gerente/eliminar-gerente/eliminar-gerente.component';
import { BuscarGerenteComponent } from './gerente/buscar-gerente/buscar-gerente.component';
import { PersonasComponent } from './personas/personas.component';
import { CrearPersonasComponent } from './personas/crear-personas/crear-personas.component';
import { EditarPersonasComponent } from './personas/editar-personas/editar-personas.component';
import { BuscarPersonasComponent } from './personas/buscar-personas/buscar-personas.component';
import { EliminarPersonasComponent } from './personas/eliminar-personas/eliminar-personas.component';


@NgModule({
  declarations: [
    EmpleadoComponent,
    GerenteComponent,
    ClienteComponent,
    DirectivoComponent,
    CrearEmpleadoComponent,
    EditarEmpleadoComponent,
    EliminarEmpleadoComponent,
    BuscarEmpleadoComponent,
    CrearClienteComponent,
    EditarClienteComponent,
    EliminarClienteComponent,
    BuscarClienteComponent,
    BuscarDirectivoComponent,
    EliminarDirectivoComponent,
    EditarDirectivoComponent,
    CrearDirectivoComponent,
    CrearGerenteComponent,
    EditarGerenteComponent,
    EliminarGerenteComponent,
    BuscarGerenteComponent,
    PersonasComponent,
    CrearPersonasComponent,
    EditarPersonasComponent,
    BuscarPersonasComponent,
    EliminarPersonasComponent
  ],
  imports: [
    CommonModule,
    PersonaRoutingModule
  ]
})
export class PersonaModule { }
