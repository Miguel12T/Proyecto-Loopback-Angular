import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  EmpresaCliente,
  Cliente,
} from '../models';
import {EmpresaClienteRepository} from '../repositories';

export class EmpresaClienteClienteController {
  constructor(
    @repository(EmpresaClienteRepository)
    public empresaClienteRepository: EmpresaClienteRepository,
  ) { }

  @get('/empresa-clientes/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to EmpresaCliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof EmpresaCliente.prototype.id,
  ): Promise<Cliente> {
    return this.empresaClienteRepository.cliente(id);
  }
}
