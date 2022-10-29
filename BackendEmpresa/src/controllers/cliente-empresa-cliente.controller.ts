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
  Cliente,
  EmpresaCliente,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteEmpresaClienteController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/empresa-clientes', {
    responses: {
      '200': {
        description: 'Array of Cliente has many EmpresaCliente',
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
    return this.clienteRepository.empresaClientes(id).find(filter);
  }

  @post('/clientes/{id}/empresa-clientes', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(EmpresaCliente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpresaCliente, {
            title: 'NewEmpresaClienteInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) empresaCliente: Omit<EmpresaCliente, 'id'>,
  ): Promise<EmpresaCliente> {
    return this.clienteRepository.empresaClientes(id).create(empresaCliente);
  }

  @patch('/clientes/{id}/empresa-clientes', {
    responses: {
      '200': {
        description: 'Cliente.EmpresaCliente PATCH success count',
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
    return this.clienteRepository.empresaClientes(id).patch(empresaCliente, where);
  }

  @del('/clientes/{id}/empresa-clientes', {
    responses: {
      '200': {
        description: 'Cliente.EmpresaCliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(EmpresaCliente)) where?: Where<EmpresaCliente>,
  ): Promise<Count> {
    return this.clienteRepository.empresaClientes(id).delete(where);
  }
}
