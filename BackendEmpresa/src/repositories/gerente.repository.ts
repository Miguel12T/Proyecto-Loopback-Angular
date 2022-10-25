import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Gerente, GerenteRelations} from '../models';

export class GerenteRepository extends DefaultCrudRepository<
  Gerente,
  typeof Gerente.prototype.id,
  GerenteRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Gerente, dataSource);
  }
}
