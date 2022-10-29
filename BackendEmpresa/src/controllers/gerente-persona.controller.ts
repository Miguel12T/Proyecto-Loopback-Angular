import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Gerente,
  Persona,
} from '../models';
import {GerenteRepository} from '../repositories';

export class GerentePersonaController {
  constructor(
    @repository(GerenteRepository)
    public gerenteRepository: GerenteRepository,
  ) { }

  @get('/gerentes/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Gerente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Gerente.prototype.id,
  ): Promise<Persona> {
    return this.gerenteRepository.persona(id);
  }
}
