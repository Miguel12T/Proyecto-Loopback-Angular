import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Empresa} from './empresa.model';
import {TipoServicio} from './tipo-servicio.model';

@model()
export class Servicios extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Empresa)
  empresaId: string;

  @belongsTo(() => TipoServicio)
  tipoServicioId: string;

  constructor(data?: Partial<Servicios>) {
    super(data);
  }
}

export interface ServiciosRelations {
  // describe navigational properties here
}

export type ServiciosWithRelations = Servicios & ServiciosRelations;
