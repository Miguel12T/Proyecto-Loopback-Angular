import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Servicios,
  Empresa,
} from '../models';
import {ServiciosRepository} from '../repositories';

export class ServiciosEmpresaController {
  constructor(
    @repository(ServiciosRepository)
    public serviciosRepository: ServiciosRepository,
  ) { }

  @get('/servicios/{id}/empresa', {
    responses: {
      '200': {
        description: 'Empresa belonging to Servicios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empresa)},
          },
        },
      },
    },
  })
  async getEmpresa(
    @param.path.string('id') id: typeof Servicios.prototype.id,
  ): Promise<Empresa> {
    return this.serviciosRepository.empresa(id);
  }
}
