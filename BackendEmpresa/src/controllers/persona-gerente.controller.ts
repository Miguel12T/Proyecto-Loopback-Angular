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
  Persona,
  Gerente,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaGerenteController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/gerentes', {
    responses: {
      '200': {
        description: 'Array of Persona has many Gerente',
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
    return this.personaRepository.gerentes(id).find(filter);
  }

  @post('/personas/{id}/gerentes', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Gerente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gerente, {
            title: 'NewGerenteInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) gerente: Omit<Gerente, 'id'>,
  ): Promise<Gerente> {
    return this.personaRepository.gerentes(id).create(gerente);
  }

  @patch('/personas/{id}/gerentes', {
    responses: {
      '200': {
        description: 'Persona.Gerente PATCH success count',
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
    return this.personaRepository.gerentes(id).patch(gerente, where);
  }

  @del('/personas/{id}/gerentes', {
    responses: {
      '200': {
        description: 'Persona.Gerente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Gerente)) where?: Where<Gerente>,
  ): Promise<Count> {
    return this.personaRepository.gerentes(id).delete(where);
  }
}
