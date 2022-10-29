import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Persona, PersonaRelations, Cliente, Empleado, Gerente} from '../models';
import {ClienteRepository} from './cliente.repository';
import {EmpleadoRepository} from './empleado.repository';
import {GerenteRepository} from './gerente.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Persona.prototype.id>;

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Persona.prototype.id>;

  public readonly gerentes: HasManyRepositoryFactory<Gerente, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('GerenteRepository') protected gerenteRepositoryGetter: Getter<GerenteRepository>,
  ) {
    super(Persona, dataSource);
    this.gerentes = this.createHasManyRepositoryFactoryFor('gerentes', gerenteRepositoryGetter,);
    this.registerInclusionResolver('gerentes', this.gerentes.inclusionResolver);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
  }
}
