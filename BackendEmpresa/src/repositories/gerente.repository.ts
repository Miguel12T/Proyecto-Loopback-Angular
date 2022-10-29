import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Gerente, GerenteRelations, Persona, Empresa} from '../models';
import {PersonaRepository} from './persona.repository';
import {EmpresaRepository} from './empresa.repository';

export class GerenteRepository extends DefaultCrudRepository<
  Gerente,
  typeof Gerente.prototype.id,
  GerenteRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Gerente.prototype.id>;

  public readonly empresa: BelongsToAccessor<Empresa, typeof Gerente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>,
  ) {
    super(Gerente, dataSource);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
