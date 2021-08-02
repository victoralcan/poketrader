import { ITradeRecord } from './ITradeRecord';

export interface ITrade {
  id: string;
  fair_trade: boolean;
  trade_rate: number;
  created_at: Date;
  updated_at: Date;
  tradeRecords: ITradeRecord[];
}
