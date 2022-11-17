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
import {EmpresaCliente} from '../models';
import {ClienteRepository, EmpresaClienteRepository, EmpresaRepository, PersonaRepository} from '../repositories';

export class EmpresaclienteController {
  constructor(
    @repository(EmpresaClienteRepository)
    public empresaClienteRepository : EmpresaClienteRepository,
    @repository(EmpresaRepository)
    public empresaRepository : EmpresaRepository,
    @repository(PersonaRepository)
    public personaRepository : PersonaRepository,
    @repository(ClienteRepository)
    public clienteRepository : ClienteRepository,

  ) {}

  @post('/empresa-clientes')
  @response(200, {
    description: 'EmpresaCliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(EmpresaCliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpresaCliente, {
            title: 'NewEmpresaCliente',
            exclude: ['id'],
          }),
        },
      },
    })
    empresaCliente: Omit<EmpresaCliente, 'id'>,
  ): Promise<EmpresaCliente> {
    return this.empresaClienteRepository.create(empresaCliente);
  }

  @get('/empresa-clientes/count')
  @response(200, {
    description: 'EmpresaCliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EmpresaCliente) where?: Where<EmpresaCliente>,
  ): Promise<Count> {
    return this.empresaClienteRepository.count(where);
  }

  i = 0;
  listadoEmpresacli:  any[] = [];
  @get('/empresa-clientes')
  @response(200, {
    description: 'Array of EmpresaCliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EmpresaCliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EmpresaCliente) filter?: Filter<EmpresaCliente>,
  ): Promise<EmpresaCliente[]> {
    let emprecli = await this.empresaClienteRepository.find(filter);

    for await(const iterator of emprecli){

      const cliePer =  this.clienteRepository.findById(iterator.clienteId);
      const Per =  this.personaRepository.findById((await cliePer).personaId);
      const empre= this.empresaRepository.findById(iterator.empresaId);

      this.i =+ 1
        let i = {
          "id": iterator.id,
          "nombre": (await Per).nombre,
          "apellidos": (await Per).apellidos,
          "empresaId": (await empre).nombre

        }
        this.listadoEmpresacli.push(i);

    }
    return this.listadoEmpresacli
  }

  @patch('/empresa-clientes')
  @response(200, {
    description: 'EmpresaCliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpresaCliente, {partial: true}),
        },
      },
    })
    empresaCliente: EmpresaCliente,
    @param.where(EmpresaCliente) where?: Where<EmpresaCliente>,
  ): Promise<Count> {
    return this.empresaClienteRepository.updateAll(empresaCliente, where);
  }

  @get('/empresa-clientes/{id}')
  @response(200, {
    description: 'EmpresaCliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EmpresaCliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EmpresaCliente, {exclude: 'where'}) filter?: FilterExcludingWhere<EmpresaCliente>
  ): Promise<EmpresaCliente> {
    return this.empresaClienteRepository.findById(id, filter);
  }

  @patch('/empresa-clientes/{id}')
  @response(204, {
    description: 'EmpresaCliente PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmpresaCliente, {partial: true}),
        },
      },
    })
    empresaCliente: EmpresaCliente,
  ): Promise<void> {
    await this.empresaClienteRepository.updateById(id, empresaCliente);
  }

  @put('/empresa-clientes/{id}')
  @response(204, {
    description: 'EmpresaCliente PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() empresaCliente: EmpresaCliente,
  ): Promise<void> {
    await this.empresaClienteRepository.replaceById(id, empresaCliente);
  }

  @del('/empresa-clientes/{id}')
  @response(204, {
    description: 'EmpresaCliente DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.empresaClienteRepository.deleteById(id);
  }
}
