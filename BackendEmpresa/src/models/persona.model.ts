import {Entity, model, property, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Empleado} from './empleado.model';
import {Gerente} from './gerente.model';

@model()
export class Persona extends Entity {
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
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  identificacion: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha_nacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  @hasMany(() => Cliente)
  clientes: Cliente[];

  @hasMany(() => Empleado)
  empleados: Empleado[];

  @hasMany(() => Gerente)
  gerentes: Gerente[];

  constructor(data?: Partial<Persona>) {
    super(data);
  }
}

export interface PersonaRelations {
  // describe navigational properties here
}

export type PersonaWithRelations = Persona & PersonaRelations;
