import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Directivo} from './directivo.model';
import {Persona} from './persona.model';
import {Empresa} from './empresa.model';

@model()
export class Empleado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  sueldo_bruto: number;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @hasMany(() => Directivo)
  directivos: Directivo[];

  @belongsTo(() => Persona)
  personaId: string;

  @belongsTo(() => Empresa)
  empresaId: string;

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
