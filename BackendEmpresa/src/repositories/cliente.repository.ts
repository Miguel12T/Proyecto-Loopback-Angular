import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Persona, EmpresaCliente} from '../models';
import {PersonaRepository} from './persona.repository';
import {EmpresaClienteRepository} from './empresa-cliente.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Cliente.prototype.id>;

  public readonly empresaClientes: HasManyRepositoryFactory<EmpresaCliente, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('EmpresaClienteRepository') protected empresaClienteRepositoryGetter: Getter<EmpresaClienteRepository>,
  ) {
    super(Cliente, dataSource);
    this.empresaClientes = this.createHasManyRepositoryFactoryFor('empresaClientes', empresaClienteRepositoryGetter,);
    this.registerInclusionResolver('empresaClientes', this.empresaClientes.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
