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
  HttpErrors,
} from '@loopback/rest';
import { request } from 'http';
import {Cliente, Credenciales} from '../models';
import {ClienteRepository, PersonaRepository} from '../repositories';
import { AutenticacionService, NotificacionService } from '../services';

export class ClienteController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository : ClienteRepository,
    @service(AutenticacionService)
    public servicioAutenticacion:AutenticacionService,
    @repository(PersonaRepository)
    public personaRepository : PersonaRepository,
    @service(NotificacionService)
    public servicioNotificacion:NotificacionService
  ) {}
  
  @post("/identificarPersona", {
    responses:{
      '200':{
        description: "Identificacion de usuarios"
      }
     }
    })
    async identificarPersona(
    @requestBody() credenciales:Credenciales
  ){
    let p = await this.servicioAutenticacion.identificarPersona(credenciales.clave, credenciales.usuario);
    if(p){
      let token = this.servicioAutenticacion.generarTokenJWT(p)
      return{
        datos:{
          id : p.id,
          nombre:p.nombre,
          email:p.email,
          identificacion:p.identificacion
        },
        tk: token
      }
    }else{
      throw new HttpErrors[401]("Datos invalidos");
    }
  }
  


  @post('/clientes')
  @response(200, {
    description: 'Cliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewCliente',
            exclude: ['id'],
          }),
        },
      },
    })
    cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    const clave = this.servicioAutenticacion.generarClave();
    
    const claveCifrada = this.servicioAutenticacion.cifrarClave(clave);
    
    cliente.clave = claveCifrada;
    let cli = await this.clienteRepository.create(cliente);

    const per = this.personaRepository.findById(cliente.personaId)
    
    const email = (await per).email

    const cuerpo = `Su clave de ingreso es: <strong>${clave}</strong>`

    const correo = this.servicioNotificacion.enviarEmail(email, cuerpo)
    
    return cli;

  }

 
  @get('/clientes/count')
  @response(200, {
    description: 'Cliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.count(where);
  }

  i = 0;
  listadoPersonasCliente:  any[] = [];
  @get('/clientes')
  @response(200, {
    description: 'Array of Cliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cliente) filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    let cli = await this.clienteRepository.find(filter);
    for await (const iterator of cli) {
      
      const per =  this.personaRepository.findById(iterator.personaId);
      
      this.i =+ 1
        let i = {
          "id": iterator.id,
          "nombre": (await per).nombre,
          "apellidos": (await per).apellidos,
          "telefono":iterator.telefono
        }
        this.listadoPersonasCliente.push(i);
    }
    return this.listadoPersonasCliente
  }

  @patch('/clientes')
  @response(200, {
    description: 'Cliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.updateAll(cliente, where);
  }

  @get('/clientes/{id}')
  @response(200, {
    description: 'Cliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cliente, {exclude: 'where'}) filter?: FilterExcludingWhere<Cliente>
  ): Promise<Cliente> {
    return this.clienteRepository.findById(id, filter);
  }

  @patch('/clientes/{id}')
  @response(204, {
    description: 'Cliente PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.updateById(id, cliente);
  }

  @put('/clientes/{id}')
  @response(204, {
    description: 'Cliente PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.replaceById(id, cliente);
  }

  @del('/clientes/{id}')
  @response(204, {
    description: 'Cliente DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clienteRepository.deleteById(id);
  }
}
