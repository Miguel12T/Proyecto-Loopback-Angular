import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {EmpresaCliente, EmpresaClienteRelations, Cliente, Empresa} from '../models';
import {ClienteRepository} from './cliente.repository';
import {EmpresaRepository} from './empresa.repository';

export class EmpresaClienteRepository extends DefaultCrudRepository<
  EmpresaCliente,
  typeof EmpresaCliente.prototype.id,
  EmpresaClienteRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof EmpresaCliente.prototype.id>;

  public readonly empresa: BelongsToAccessor<Empresa, typeof EmpresaCliente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>,
  ) {
    super(EmpresaCliente, dataSource);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
