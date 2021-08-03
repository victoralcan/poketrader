import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import PokemonsRepository from '../repositories/PokemonsRepository';

import CreatePokemonService from '../services/CreatePokemonService';

const pokemonsRouter = Router();

pokemonsRouter.get('/:name', async (request, response) => {
  const { name } = request.params;
  const pokemonsRepository = getCustomRepository(PokemonsRepository);
  const pokemonOnCache = await pokemonsRepository.findOne({
    where: { name },
  });

  if (!pokemonOnCache) {
    const createPokemon = new CreatePokemonService();
    const newPokemon = await createPokemon.execute({ name });
    if (!newPokemon) {
      return response.status(404).json({ error: 'Pokemon does not exists' });
    }
    return response.json(newPokemon);
  }

  return response.json(pokemonOnCache);
});

export default pokemonsRouter;
