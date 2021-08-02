import { IPokemon } from './IPokemon';

export interface ITradeRecord {
  id: string;
  trade_id: string;
  pokemon_id: string;
  left: boolean;
  pokemon: IPokemon;
  created_at: Date;
  updated_at: Date;
}
