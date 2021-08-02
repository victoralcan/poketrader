import { Router } from 'express';

import pokemonsRouter from './pokemons.routes';
import tradesRouter from './trades.routes';

const routes = Router();

routes.use('/pokemons', pokemonsRouter);
routes.use('/trades', tradesRouter);

export default routes;
