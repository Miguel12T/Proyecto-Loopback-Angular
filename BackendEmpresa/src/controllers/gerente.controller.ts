import { service } from '@loopback/core';
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
import {Gerente} from '../models';
import {GerenteRepository, PersonaRepository} from '../repositories';
import { AutenticacionService, NotificacionService } from '../services';

export class GerenteController {
  constructor(
    @repository(GerenteRepository)
    public gerenteRepository : GerenteRepository,
    @service(NotificacionService)
    public servicioNotificacion:NotificacionService,
    @repository(PersonaRepository)
    public personaRepository:PersonaRepository,
    @service(AutenticacionService)
    public servicioAutenticacion:AutenticacionService
  ) {}

  @post('/gerentes')
  @response(200, {
    description: 'Gerente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Gerente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gerente, {
            title: 'NewGerente',
            exclude: ['id'],
          }),
        },
      },
    })
    gerente: Omit<Gerente, 'id'>,
  ): Promise<Gerente> {
    const clave = this.servicioAutenticacion.generarClave();
    const claveCifrada = this.servicioAutenticacion.cifrarClave(clave);
    gerente.clave = claveCifrada;

    let gere = await this.gerenteRepository.create(gerente);

    const per = this.personaRepository.findById(gerente.personaId)
    const email = (await per).email

    const cuerpo = `Su clave de ingreso es: <strong>${clave}</strong>`

    const correo = this.servicioNotificacion.enviarEmail(email, cuerpo)

    return gere;
  }

  @get('/gerentes/count')
  @response(200, {
    description: 'Gerente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Gerente) where?: Where<Gerente>,
  ): Promise<Count> {
    return this.gerenteRepository.count(where);
  }

  @get('/gerentes')
  @response(200, {
    description: 'Array of Gerente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Gerente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Gerente) filter?: Filter<Gerente>,
  ): Promise<Gerente[]> {
    return this.gerenteRepository.find(filter);
  }

  @patch('/gerentes')
  @response(200, {
    description: 'Gerente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gerente, {partial: true}),
        },
      },
    })
    gerente: Gerente,
    @param.where(Gerente) where?: Where<Gerente>,
  ): Promise<Count> {
    return this.gerenteRepository.updateAll(gerente, where);
  }

  @get('/gerentes/{id}')
  @response(200, {
    description: 'Gerente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Gerente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Gerente, {exclude: 'where'}) filter?: FilterExcludingWhere<Gerente>
  ): Promise<Gerente> {
    return this.gerenteRepository.findById(id, filter);
  }

  @patch('/gerentes/{id}')
  @response(204, {
    description: 'Gerente PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gerente, {partial: true}),
        },
      },
    })
    gerente: Gerente,
  ): Promise<void> {
    await this.gerenteRepository.updateById(id, gerente);
  }

  @put('/gerentes/{id}')
  @response(204, {
    description: 'Gerente PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() gerente: Gerente,
  ): Promise<void> {
    await this.gerenteRepository.replaceById(id, gerente);
  }

  @del('/gerentes/{id}')
  @response(204, {
    description: 'Gerente DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.gerenteRepository.deleteById(id);
  }
}
