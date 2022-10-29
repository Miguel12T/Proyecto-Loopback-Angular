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
  Empresa,
  Servicios,
} from '../models';
import {EmpresaRepository} from '../repositories';

export class EmpresaServiciosController {
  constructor(
    @repository(EmpresaRepository) protected empresaRepository: EmpresaRepository,
  ) { }

  @get('/empresas/{id}/servicios', {
    responses: {
      '200': {
        description: 'Array of Empresa has many Servicios',
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
    return this.empresaRepository.servicios(id).find(filter);
  }

  @post('/empresas/{id}/servicios', {
    responses: {
      '200': {
        description: 'Empresa model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servicios)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empresa.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicios, {
            title: 'NewServiciosInEmpresa',
            exclude: ['id'],
            optional: ['empresaId']
          }),
        },
      },
    }) servicios: Omit<Servicios, 'id'>,
  ): Promise<Servicios> {
    return this.empresaRepository.servicios(id).create(servicios);
  }

  @patch('/empresas/{id}/servicios', {
    responses: {
      '200': {
        description: 'Empresa.Servicios PATCH success count',
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
    return this.empresaRepository.servicios(id).patch(servicios, where);
  }

  @del('/empresas/{id}/servicios', {
    responses: {
      '200': {
        description: 'Empresa.Servicios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Servicios)) where?: Where<Servicios>,
  ): Promise<Count> {
    return this.empresaRepository.servicios(id).delete(where);
  }
}
