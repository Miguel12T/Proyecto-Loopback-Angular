import {Entity, model, property, hasMany} from '@loopback/repository';
import {Servicios} from './servicios.model';

@model()
export class TipoServicio extends Entity {
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
  tipo: string;

  @hasMany(() => Servicios)
  servicios: Servicios[];

  constructor(data?: Partial<TipoServicio>) {
    super(data);
  }
}

export interface TipoServicioRelations {
  // describe navigational properties here
}

export type TipoServicioWithRelations = TipoServicio & TipoServicioRelations;
