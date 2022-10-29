import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Persona} from './persona.model';
import {Empresa} from './empresa.model';

@model()
export class Gerente extends Entity {
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
  tipo_cargo: string;

  @belongsTo(() => Persona)
  personaId: string;

  @belongsTo(() => Empresa)
  empresaId: string;

  constructor(data?: Partial<Gerente>) {
    super(data);
  }
}

export interface GerenteRelations {
  // describe navigational properties here
}

export type GerenteWithRelations = Gerente & GerenteRelations;
