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
import {Empleado} from '../models';
import {EmpleadoRepository, EmpresaRepository, PersonaRepository} from '../repositories';
import { AutenticacionService, NotificacionService } from '../services';

export class EmpleadoController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository : EmpleadoRepository,
    @service(AutenticacionService)
    public servicioAutenticacion:AutenticacionService,
    @repository(PersonaRepository)
    public personaRepository:PersonaRepository,
    @service(NotificacionService)
    public servicioNotificacion:NotificacionService,
    @repository(EmpresaRepository)
    public empresaRepository: EmpresaRepository
  ) {}

  @post('/empleados')
  @response(200, {
    description: 'Empleado model instance',
    content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleado',
            exclude: ['id'],
          }),
        },
      },
    })
    empleado: Omit<Empleado, 'id'>,
  ): Promise<Empleado> {
    const clave = this.servicioAutenticacion.generarClave();
    const claveCifrada = this.servicioAutenticacion.cifrarClave(clave);
    empleado.clave = claveCifrada;

    let  emple =await this.empleadoRepository.create(empleado);

    const per = this.personaRepository.findById(empleado.personaId)
    const email = (await per).email

    const cuerpo = `Su clave de ingreso es: <strong>${clave}</strong>`

    const correo = this.servicioNotificacion.enviarEmail(email, cuerpo)

    return emple;
  }

  @get('/empleados/count')
  @response(200, {
    description: 'Empleado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Empleado) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.empleadoRepository.count(where);
  }

   i = 0;
   listadoPersonasEmpleados:  any[] = [];
  @get('/empleados')
  @response(200, {
    description: 'Array of Empleado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Empleado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Empleado) filter?: Filter<Empleado>,
  ): Promise<Empleado[]> {
    let emp = await this.empleadoRepository.find(filter);
    for await (const iterator of emp) {
      
      const per =  this.personaRepository.findById(iterator.personaId);
      const empre =  this.empresaRepository.findById(iterator.empresaId);
      
      this.i =+ 1
        let i = {
          "id": iterator.id,
          "sueldo_bruto": iterator.sueldo_bruto,
          "empresaId": (await empre).nombre,
          "nombre": (await per).nombre,
          "apellidos": (await per).apellidos
        }
        this.listadoPersonasEmpleados.push(i);
    }
    return this.listadoPersonasEmpleados

  }

  @patch('/empleados')
  @response(200, {
    description: 'Empleado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Empleado,
    @param.where(Empleado) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.empleadoRepository.updateAll(empleado, where);
  }

  @get('/empleados/{id}')
  @response(200, {
    description: 'Empleado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Empleado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Empleado, {exclude: 'where'}) filter?: FilterExcludingWhere<Empleado>
  ): Promise<Empleado> {
    return this.empleadoRepository.findById(id, filter);
  }

  @patch('/empleados/{id}')
  @response(204, {
    description: 'Empleado PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Empleado,
  ): Promise<void> {
    await this.empleadoRepository.updateById(id, empleado);
  }

  @put('/empleados/{id}')
  @response(204, {
    description: 'Empleado PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() empleado: Empleado,
  ): Promise<void> {
    await this.empleadoRepository.replaceById(id, empleado);
  }

  @del('/empleados/{id}')
  @response(204, {
    description: 'Empleado DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.empleadoRepository.deleteById(id);
  }
}
