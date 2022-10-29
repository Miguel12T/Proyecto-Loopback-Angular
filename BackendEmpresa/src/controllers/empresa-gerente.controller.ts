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
  Gerente,
} from '../models';
import {EmpresaRepository} from '../repositories';

export class EmpresaGerenteController {
  constructor(
    @repository(EmpresaRepository) protected empresaRepository: EmpresaRepository,
  ) { }

  @get('/empresas/{id}/gerentes', {
    responses: {
      '200': {
        description: 'Array of Empresa has many Gerente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Gerente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Gerente>,
  ): Promise<Gerente[]> {
    return this.empresaRepository.gerentes(id).find(filter);
  }

  @post('/empresas/{id}/gerentes', {
    responses: {
      '200': {
        description: 'Empresa model instance',
        content: {'application/json': {schema: getModelSchemaRef(Gerente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empresa.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gerente, {
            title: 'NewGerenteInEmpresa',
            exclude: ['id'],
            optional: ['empresaId']
          }),
        },
      },
    }) gerente: Omit<Gerente, 'id'>,
  ): Promise<Gerente> {
    return this.empresaRepository.gerentes(id).create(gerente);
  }

  @patch('/empresas/{id}/gerentes', {
    responses: {
      '200': {
        description: 'Empresa.Gerente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gerente, {partial: true}),
        },
      },
    })
    gerente: Partial<Gerente>,
    @param.query.object('where', getWhereSchemaFor(Gerente)) where?: Where<Gerente>,
  ): Promise<Count> {
    return this.empresaRepository.gerentes(id).patch(gerente, where);
  }

  @del('/empresas/{id}/gerentes', {
    responses: {
      '200': {
        description: 'Empresa.Gerente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Gerente)) where?: Where<Gerente>,
  ): Promise<Count> {
    return this.empresaRepository.gerentes(id).delete(where);
  }
}
