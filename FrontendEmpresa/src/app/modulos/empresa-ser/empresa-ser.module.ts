import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaSerRoutingModule } from './empresa-ser-routing.module';
import { ServicioComponent } from './servicio/servicio.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { CrearEmpresaComponent } from './empresa/crear-empresa/crear-empresa.component';
import { EditarEmpresaComponent } from './empresa/editar-empresa/editar-empresa.component';
import { EliminarEmpresaComponent } from './empresa/eliminar-empresa/eliminar-empresa.component';
import { BuscarEmpresaComponent } from './empresa/buscar-empresa/buscar-empresa.component';
import { BuscarServicioComponent } from './servicio/buscar-servicio/buscar-servicio.component';
import { CrearServicioComponent } from './servicio/crear-servicio/crear-servicio.component';
import { EliminarServicioComponent } from './servicio/eliminar-servicio/eliminar-servicio.component';
import { EditarServicioComponent } from './servicio/editar-servicio/editar-servicio.component';
import { TipoServicioComponent } from './tipo-servicio/tipo-servicio.component';
import { CrearTipoComponent } from './tipo-servicio/crear-tipo/crear-tipo.component';
import { EditarTipoComponent } from './tipo-servicio/editar-tipo/editar-tipo.component';
import { EliminarTipoComponent } from './tipo-servicio/eliminar-tipo/eliminar-tipo.component';
import { BuscarTipoComponent } from './tipo-servicio/buscar-tipo/buscar-tipo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from "angular-datatables";
import { EmpresaclienteComponent } from './empresacliente/empresacliente.component';
import { CrearEmpresaclienteComponent } from './empresacliente/crear-empresacliente/crear-empresacliente.component';
import { EditarEmpresaclienteComponent } from './empresacliente/editar-empresacliente/editar-empresacliente.component';
import { BuscarEmpresaclienteComponent } from './empresacliente/buscar-empresacliente/buscar-empresacliente.component';


@NgModule({
  declarations: [
    ServicioComponent,
    EmpresaComponent,
    CrearEmpresaComponent,
    EditarEmpresaComponent,
    EliminarEmpresaComponent,
    BuscarEmpresaComponent,
    BuscarServicioComponent,
    CrearServicioComponent,
    EliminarServicioComponent,
    EditarServicioComponent,
    TipoServicioComponent,
    CrearTipoComponent,
    EditarTipoComponent,
    EliminarTipoComponent,
    BuscarTipoComponent,
    EmpresaclienteComponent,
    CrearEmpresaclienteComponent,
    EditarEmpresaclienteComponent,
    BuscarEmpresaclienteComponent
  ],
  imports: [
    CommonModule,
    EmpresaSerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
  ]
})
export class EmpresaSerModule { }
