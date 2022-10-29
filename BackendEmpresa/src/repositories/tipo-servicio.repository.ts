import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TipoServicio, TipoServicioRelations, Servicios} from '../models';
import {ServiciosRepository} from './servicios.repository';

export class TipoServicioRepository extends DefaultCrudRepository<
  TipoServicio,
  typeof TipoServicio.prototype.id,
  TipoServicioRelations
> {

  public readonly servicios: HasManyRepositoryFactory<Servicios, typeof TipoServicio.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ServiciosRepository') protected serviciosRepositoryGetter: Getter<ServiciosRepository>,
  ) {
    super(TipoServicio, dataSource);
    this.servicios = this.createHasManyRepositoryFactoryFor('servicios', serviciosRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
  }
}
