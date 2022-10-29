import {Entity, model, property, hasMany} from '@loopback/repository';
import {Empleado} from './empleado.model';
import {Gerente} from './gerente.model';
import {EmpresaCliente} from './empresa-cliente.model';
import {Servicios} from './servicios.model';

@model()
export class Empresa extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  nit: string;

  @hasMany(() => Empleado)
  empleados: Empleado[];

  @hasMany(() => Gerente)
  gerentes: Gerente[];

  @hasMany(() => EmpresaCliente)
  empresaClientes: EmpresaCliente[];

  @hasMany(() => Servicios)
  servicios: Servicios[];

  constructor(data?: Partial<Empresa>) {
    super(data);
  }
}

export interface EmpresaRelations {
  // describe navigational properties here
}

export type EmpresaWithRelations = Empresa & EmpresaRelations;
