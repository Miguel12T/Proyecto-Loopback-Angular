import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Empresa, EmpresaRelations, Empleado, Gerente, EmpresaCliente, Servicios} from '../models';
import {EmpleadoRepository} from './empleado.repository';
import {GerenteRepository} from './gerente.repository';
import {EmpresaClienteRepository} from './empresa-cliente.repository';
import {ServiciosRepository} from './servicios.repository';

export class EmpresaRepository extends DefaultCrudRepository<
  Empresa,
  typeof Empresa.prototype.id,
  EmpresaRelations
> {

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Empresa.prototype.id>;

  public readonly gerentes: HasManyRepositoryFactory<Gerente, typeof Empresa.prototype.id>;

  public readonly empresaClientes: HasManyRepositoryFactory<EmpresaCliente, typeof Empresa.prototype.id>;

  public readonly servicios: HasManyRepositoryFactory<Servicios, typeof Empresa.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('GerenteRepository') protected gerenteRepositoryGetter: Getter<GerenteRepository>, @repository.getter('EmpresaClienteRepository') protected empresaClienteRepositoryGetter: Getter<EmpresaClienteRepository>, @repository.getter('ServiciosRepository') protected serviciosRepositoryGetter: Getter<ServiciosRepository>,
  ) {
    super(Empresa, dataSource);
    this.servicios = this.createHasManyRepositoryFactoryFor('servicios', serviciosRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
    this.empresaClientes = this.createHasManyRepositoryFactoryFor('empresaClientes', empresaClienteRepositoryGetter,);
    this.registerInclusionResolver('empresaClientes', this.empresaClientes.inclusionResolver);
    this.gerentes = this.createHasManyRepositoryFactoryFor('gerentes', gerenteRepositoryGetter,);
    this.registerInclusionResolver('gerentes', this.gerentes.inclusionResolver);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
  }
}
