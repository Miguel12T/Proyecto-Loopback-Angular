import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  TipoServicio,
  Servicios,
} from '../models';
import {TipoServicioRepository} from '../repositories';

export class TipoServicioServiciosController {
  constructor(
    @repository(TipoServicioRepository) protected tipoServicioRepository: TipoServicioRepository,
  ) { }

  @get('/tipo-servicios/{id}/servicios', {
    responses: {
      '200': {
        description: 'Array of TipoServicio has many Servicios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Servicios)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Servicios>,
  ): Promise<Servicios[]> {
    return this.tipoServicioRepository.servicios(id).find(filter);
  }

  @post('/tipo-servicios/{id}/servicios', {
    responses: {
      '200': {
        description: 'TipoServicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servicios)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TipoServicio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicios, {
            title: 'NewServiciosInTipoServicio',
            exclude: ['id'],
            optional: ['tipoServicioId']
          }),
        },
      },
    }) servicios: Omit<Servicios, 'id'>,
  ): Promise<Servicios> {
    return this.tipoServicioRepository.servicios(id).create(servicios);
  }

  @patch('/tipo-servicios/{id}/servicios', {
    responses: {
      '200': {
        description: 'TipoServicio.Servicios PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicios, {partial: true}),
        },
      },
    })
    servicios: Partial<Servicios>,
    @param.query.object('where', getWhereSchemaFor(Servicios)) where?: Where<Servicios>,
  ): Promise<Count> {
    return this.tipoServicioRepository.servicios(id).patch(servicios, where);
  }

  @del('/tipo-servicios/{id}/servicios', {
    responses: {
      '200': {
        description: 'TipoServicio.Servicios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Servicios)) where?: Where<Servicios>,
  ): Promise<Count> {
    return this.tipoServicioRepository.servicios(id).delete(where);
  }
}
