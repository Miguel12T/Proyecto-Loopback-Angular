import {Model, model, property} from '@loopback/repository';

@model()
export class Credenciales extends Model {
  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;


  constructor(data?: Partial<Credenciales>) {
    super(data);
  }
}

export interface CredencialesaRelations {
  // describe navigational properties here
}

export type CredencialesaWithRelations = Credenciales & CredencialesaRelations;
