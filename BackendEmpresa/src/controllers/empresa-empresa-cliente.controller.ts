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
  EmpresaCliente,
} from '../models';
import {EmpresaRepository} from '../repositories';

export class EmpresaEmpresaClienteController {
  constructor(
    @repository(EmpresaRepository) protected empresaRepository: EmpresaRepository,
  ) { }

  @get('/empresas/{id}/empresa-clientes', {
    responses: {
      '200': {
        description: 'Array of Empresa has many EmpresaCliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EmpresaCliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<EmpresaCliente>,
  ): Promise<EmpresaCliente[]> {
    return this.empresaRepository.empresaClientes(id).find(filter);
  }

  @post('/empresas/{id}/empresa-clientes', {
    responses: {
      '200': {
        description: 'Empresa model instance',
        content: {'application/json': {schema: getModelSchemaRef(EmpresaCliente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empresa.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpresaCliente, {
            title: 'NewEmpresaClienteInEmpresa',
            exclude: ['id'],
            optional: ['empresaId']
          }),
        },
      },
    }) empresaCliente: Omit<EmpresaCliente, 'id'>,
  ): Promise<EmpresaCliente> {
    return this.empresaRepository.empresaClientes(id).create(empresaCliente);
  }

  @patch('/empresas/{id}/empresa-clientes', {
    responses: {
      '200': {
        description: 'Empresa.EmpresaCliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpresaCliente, {partial: true}),
        },
      },
    })
    empresaCliente: Partial<EmpresaCliente>,
    @param.query.object('where', getWhereSchemaFor(EmpresaCliente)) where?: Where<EmpresaCliente>,
  ): Promise<Count> {
    return this.empresaRepository.empresaClientes(id).patch(empresaCliente, where);
  }

  @del('/empresas/{id}/empresa-clientes', {
    responses: {
      '200': {
        description: 'Empresa.EmpresaCliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(EmpresaCliente)) where?: Where<EmpresaCliente>,
  ): Promise<Count> {
    return this.empresaRepository.empresaClientes(id).delete(where);
  }
}
