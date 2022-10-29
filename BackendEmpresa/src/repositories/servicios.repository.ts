import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Servicios, ServiciosRelations, Empresa, TipoServicio} from '../models';
import {EmpresaRepository} from './empresa.repository';
import {TipoServicioRepository} from './tipo-servicio.repository';

export class ServiciosRepository extends DefaultCrudRepository<
  Servicios,
  typeof Servicios.prototype.id,
  ServiciosRelations
> {

  public readonly empresa: BelongsToAccessor<Empresa, typeof Servicios.prototype.id>;

  public readonly tipoServicio: BelongsToAccessor<TipoServicio, typeof Servicios.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>, @repository.getter('TipoServicioRepository') protected tipoServicioRepositoryGetter: Getter<TipoServicioRepository>,
  ) {
    super(Servicios, dataSource);
    this.tipoServicio = this.createBelongsToAccessorFor('tipoServicio', tipoServicioRepositoryGetter,);
    this.registerInclusionResolver('tipoServicio', this.tipoServicio.inclusionResolver);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
  }
}
