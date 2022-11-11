import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {TipoServicio} from '../models';
import {TipoServicioRepository} from '../repositories';

export class TipoServicioController {
  constructor(
    @repository(TipoServicioRepository)
    public tipoServicioRepository : TipoServicioRepository,
  ) {}

  @post('/tipo-servicios')
  @response(200, {
    description: 'TipoServicio model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoServicio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoServicio, {
            title: 'NewTipoServicio',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoServicio: Omit<TipoServicio, 'id'>,
  ): Promise<TipoServicio> {
    return this.tipoServicioRepository.create(tipoServicio);
  }

  @get('/tipo-servicios/count')
  @response(200, {
    description: 'TipoServicio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoServicio) where?: Where<TipoServicio>,
  ): Promise<Count> {
    return this.tipoServicioRepository.count(where);
  }

  @get('/tipo-servicios')
  @response(200, {
    description: 'Array of TipoServicio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoServicio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoServicio) filter?: Filter<TipoServicio>,
  ): Promise<TipoServicio[]> {
    return this.tipoServicioRepository.find(filter);
  }

  @patch('/tipo-servicios')
  @response(200, {
    description: 'TipoServicio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoServicio, {partial: true}),
        },
      },
    })
    tipoServicio: TipoServicio,
    @param.where(TipoServicio) where?: Where<TipoServicio>,
  ): Promise<Count> {
    return this.tipoServicioRepository.updateAll(tipoServicio, where);
  }

  @get('/tipo-servicios/{id}')
  @response(200, {
    description: 'TipoServicio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoServicio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TipoServicio, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoServicio>
  ): Promise<TipoServicio> {
    return this.tipoServicioRepository.findById(id, filter);
  }

  @patch('/tipo-servicios/{id}')
  @response(204, {
    description: 'TipoServicio PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoServicio, {partial: true}),
        },
      },
    })
    tipoServicio: TipoServicio,
  ): Promise<void> {
    await this.tipoServicioRepository.updateById(id, tipoServicio);
  }

  @put('/tipo-servicios/{id}')
  @response(204, {
    description: 'TipoServicio PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tipoServicio: TipoServicio,
  ): Promise<void> {
    await this.tipoServicioRepository.replaceById(id, tipoServicio);
  }

  @del('/tipo-servicios/{id}')
  @response(204, {
    description: 'TipoServicio DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tipoServicioRepository.deleteById(id);
  }
}
