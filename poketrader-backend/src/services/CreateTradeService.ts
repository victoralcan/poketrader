import { getCustomRepository } from 'typeorm';
import Pokemon from '../models/Pokemon';
import Trade from '../models/Trade';
import TradesRepository from '../repositories/TradesRepository';
import CreateTradeRecordService from './CreateTradeRecordService';

interface IRequestDTO {
  leftPokemons: Array<Pokemon>;
  rightPokemons: Array<Pokemon>;
  trade_rate: number;
  fair_trade: boolean;
}

class CreateTradeService {
  public async execute({
    leftPokemons,
    rightPokemons,
    trade_rate,
    fair_trade,
  }: IRequestDTO): Promise<Trade | undefined> {
    const tradesRepository = getCustomRepository(TradesRepository);

    try {
      const trade = tradesRepository.create({
        trade_rate,
        fair_trade,
      });
      await tradesRepository.save(trade);
      const createTradeRecords = new CreateTradeRecordService();
      await createTradeRecords.execute({
        leftPokemons,
        rightPokemons,
        trade_id: trade.id,
      });
      return trade;
    } catch (e) {
      return undefined;
    }
  }
}

export default CreateTradeService;
