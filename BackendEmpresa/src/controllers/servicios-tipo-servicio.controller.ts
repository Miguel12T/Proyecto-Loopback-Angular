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
  TipoServicio,
} from '../models';
import {ServiciosRepository} from '../repositories';

export class ServiciosTipoServicioController {
  constructor(
    @repository(ServiciosRepository)
    public serviciosRepository: ServiciosRepository,
  ) { }

  @get('/servicios/{id}/tipo-servicio', {
    responses: {
      '200': {
        description: 'TipoServicio belonging to Servicios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoServicio)},
          },
        },
      },
    },
  })
  async getTipoServicio(
    @param.path.string('id') id: typeof Servicios.prototype.id,
  ): Promise<TipoServicio> {
    return this.serviciosRepository.tipoServicio(id);
  }
}
