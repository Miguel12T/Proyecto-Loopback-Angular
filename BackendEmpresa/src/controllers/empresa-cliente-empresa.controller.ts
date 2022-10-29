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
  Empresa,
} from '../models';
import {EmpresaClienteRepository} from '../repositories';

export class EmpresaClienteEmpresaController {
  constructor(
    @repository(EmpresaClienteRepository)
    public empresaClienteRepository: EmpresaClienteRepository,
  ) { }

  @get('/empresa-clientes/{id}/empresa', {
    responses: {
      '200': {
        description: 'Empresa belonging to EmpresaCliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empresa)},
          },
        },
      },
    },
  })
  async getEmpresa(
    @param.path.string('id') id: typeof EmpresaCliente.prototype.id,
  ): Promise<Empresa> {
    return this.empresaClienteRepository.empresa(id);
  }
}
