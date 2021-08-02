import { EntityRepository, Repository } from 'typeorm';

import Pokemon from '../models/Pokemon';

@EntityRepository(Pokemon)
class PokemonsRepository extends Repository<Pokemon> {}

export default PokemonsRepository;
