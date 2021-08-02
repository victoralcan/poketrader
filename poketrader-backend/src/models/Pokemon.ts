import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import TradeRecords from './TradeRecords';

@Entity('pokemons')
class Pokemon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('integer')
  api_id: number;

  @Column()
  name: string;

  @Column('integer')
  base_experience: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => TradeRecords, tradeRecords => tradeRecords.pokemon)
  tradeRecords: TradeRecords[];
}

export default Pokemon;
