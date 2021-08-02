import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Pokemon from './Pokemon';
import Trade from './Trade';

@Entity('trade_records')
class TradeRecords {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  trade_id: string;

  @ManyToOne(() => Trade, trade => trade.tradeRecords)
  @JoinColumn({ name: 'trade_id' })
  trade: Trade;

  @Column()
  pokemon_id: string;

  @Column('boolean')
  left: boolean;

  @ManyToOne(() => Pokemon, pokemon => pokemon.tradeRecords, { eager: true })
  @JoinColumn({ name: 'pokemon_id' })
  pokemon: Pokemon;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default TradeRecords;
