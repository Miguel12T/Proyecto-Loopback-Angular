import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Gerente>) {
    super(data);
  }
}

export interface GerenteRelations {
  // describe navigational properties here
}

export type GerenteWithRelations = Gerente & GerenteRelations;
