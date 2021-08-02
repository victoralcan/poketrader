import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import CreateTradeService from '../services/CreateTradeService';
import TradesRepository from '../repositories/TradesRepository';

const tradesRouter = Router();

tradesRouter.get('/', async (request, response) => {
  const tradesRepository = getCustomRepository(TradesRepository);
  const trades = await tradesRepository.find();
  return response.json(trades);
});

tradesRouter.post('/', async (request, response) => {
  const { leftPokemons, rightPokemons, trade_rate, fair_trade } = request.body;
  const createTrade = new CreateTradeService();
  const newTrade = await createTrade.execute({
    leftPokemons,
    rightPokemons,
    trade_rate,
    fair_trade,
  });
  return response.json(newTrade);
});

export default tradesRouter;
