import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Gerente,
  Empresa,
} from '../models';
import {GerenteRepository} from '../repositories';

export class GerenteEmpresaController {
  constructor(
    @repository(GerenteRepository)
    public gerenteRepository: GerenteRepository,
  ) { }

  @get('/gerentes/{id}/empresa', {
    responses: {
      '200': {
        description: 'Empresa belonging to Gerente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empresa)},
          },
        },
      },
    },
  })
  async getEmpresa(
    @param.path.string('id') id: typeof Gerente.prototype.id,
  ): Promise<Empresa> {
    return this.gerenteRepository.empresa(id);
  }
}
