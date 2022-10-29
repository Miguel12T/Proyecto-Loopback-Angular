import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Empresa} from './empresa.model';

@model()
export class EmpresaCliente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => Empresa)
  empresaId: string;

  constructor(data?: Partial<EmpresaCliente>) {
    super(data);
  }
}

export interface EmpresaClienteRelations {
  // describe navigational properties here
}

export type EmpresaClienteWithRelations = EmpresaCliente & EmpresaClienteRelations;
