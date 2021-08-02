import { getCustomRepository } from 'typeorm';
import Pokemon from '../models/Pokemon';
import TradeRecordsRepository from '../repositories/TradeRecordsRepository';

interface IRequestDTO {
  leftPokemons: Array<Pokemon>;
  rightPokemons: Array<Pokemon>;
  trade_id: string;
}

class CreateTradeRecordService {
  public async execute({
    leftPokemons,
    rightPokemons,
    trade_id,
  }: IRequestDTO): Promise<void> {
    const tradeRecordRepository = getCustomRepository(TradeRecordsRepository);

    try {
      for (const leftPokemon of leftPokemons) {
        const tradeRecord = tradeRecordRepository.create({
          trade_id,
          left: true,
          pokemon_id: leftPokemon.id,
        });
        await tradeRecordRepository.save(tradeRecord);
      }
      for (const rightPokemon of rightPokemons) {
        const tradeRecord = tradeRecordRepository.create({
          trade_id,
          left: false,
          pokemon_id: rightPokemon.id,
        });
        await tradeRecordRepository.save(tradeRecord);
      }
    } catch (e) {
      throw new Error(`An error ocurred while saving trade records`);
    }
  }
}

export default CreateTradeRecordService;
