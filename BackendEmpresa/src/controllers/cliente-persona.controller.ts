import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cliente,
  Persona,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClientePersonaController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Cliente.prototype.id,
  ): Promise<Persona> {
    return this.clienteRepository.persona(id);
  }
}
