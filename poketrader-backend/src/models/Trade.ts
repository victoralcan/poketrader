import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import TradeRecords from './TradeRecords';

@Entity('trades')
class Trade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('boolean')
  fair_trade: boolean;

  @Column('decimal')
  trade_rate: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => TradeRecords, tradeRecords => tradeRecords.trade, {
    eager: true,
  })
  tradeRecords: TradeRecords;
}

export default Trade;
