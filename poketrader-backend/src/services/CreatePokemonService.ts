import { getCustomRepository } from 'typeorm';

import PokemonsRepository from '../repositories/PokemonsRepository';
import pokeapi from './pokeapi';
import Pokemon from '../models/Pokemon';

interface IRequestDTO {
  name: string;
}

class CreatePokemonService {
  public async execute({ name }: IRequestDTO): Promise<Pokemon | undefined> {
    const pokemonsRepository = getCustomRepository(PokemonsRepository);

    const checkPokemonExists = await pokemonsRepository.findOne({
      where: { name },
    });

    if (checkPokemonExists) {
      throw new Error(`Pokemon ${name} already registered in the database`);
    }

    try {
      const { data: pokemonOnAPI } = await pokeapi.get(`pokemon/${name}`);
      const pokemon = pokemonsRepository.create({
        name,
        api_id: pokemonOnAPI.id,
        base_experience: pokemonOnAPI.base_experience,
      });
      await pokemonsRepository.save(pokemon);
      return pokemon;
    } catch (e) {
      return undefined;
    }
  }
}

export default CreatePokemonService;
