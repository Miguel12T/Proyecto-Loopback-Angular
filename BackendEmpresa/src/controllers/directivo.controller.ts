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
import {Directivo} from '../models';
import {DirectivoRepository, EmpleadoRepository, PersonaRepository} from '../repositories';

export class DirectivoController {
  constructor(
    @repository(DirectivoRepository)
    public directivoRepository : DirectivoRepository,
    @repository(PersonaRepository)
    public personaRepository : PersonaRepository,
    @repository(EmpleadoRepository)
    public empleadoRepository : EmpleadoRepository
   
  ) {}

  @post('/directivos')
  @response(200, {
    description: 'Directivo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Directivo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Directivo, {
            title: 'NewDirectivo',
            exclude: ['id'],
          }),
        },
      },
    })
    directivo: Omit<Directivo, 'id'>,
  ): Promise<Directivo> {
    return this.directivoRepository.create(directivo);
  }

  @get('/directivos/count')
  @response(200, {
    description: 'Directivo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Directivo) where?: Where<Directivo>,
  ): Promise<Count> {
    return this.directivoRepository.count(where);
  }

  i = 0;
  listadoPersonasEmpleados:  any[] = [];
  @get('/directivos')
  @response(200, {
    description: 'Array of Directivo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Directivo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Directivo) filter?: Filter<Directivo>,
  ): Promise<Directivo[]> {
    let dir = await this.directivoRepository.find(filter);
    for await (const iterator of dir) {
      
      const EmpleadoPer =  this.empleadoRepository.findById(iterator.empleadoId);
      const Per =  this.personaRepository.findById((await EmpleadoPer).personaId);
      
      this.i =+ 1
        let i = {
          "id": iterator.id,
          "categoria": iterator.categoria,
          "nombre": (await Per).nombre,
          "apellidos": (await Per).apellidos
        }
        this.listadoPersonasEmpleados.push(i);
    }
    return this.listadoPersonasEmpleados
  }

  @patch('/directivos')
  @response(200, {
    description: 'Directivo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Directivo, {partial: true}),
        },
      },
    })
    directivo: Directivo,
    @param.where(Directivo) where?: Where<Directivo>,
  ): Promise<Count> {
    return this.directivoRepository.updateAll(directivo, where);
  }

  @get('/directivos/{id}')
  @response(200, {
    description: 'Directivo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Directivo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Directivo, {exclude: 'where'}) filter?: FilterExcludingWhere<Directivo>
  ): Promise<Directivo> {
    return this.directivoRepository.findById(id, filter);
  }

  @patch('/directivos/{id}')
  @response(204, {
    description: 'Directivo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Directivo, {partial: true}),
        },
      },
    })
    directivo: Directivo,
  ): Promise<void> {
    await this.directivoRepository.updateById(id, directivo);
  }

  @put('/directivos/{id}')
  @response(204, {
    description: 'Directivo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() directivo: Directivo,
  ): Promise<void> {
    await this.directivoRepository.replaceById(id, directivo);
  }

  @del('/directivos/{id}')
  @response(204, {
    description: 'Directivo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.directivoRepository.deleteById(id);
  }
}
