import { EntityRepository, Repository } from 'typeorm';

import TradeRecords from '../models/TradeRecords';

@EntityRepository(TradeRecords)
class TradeRecordsRepository extends Repository<TradeRecords> {}

export default TradeRecordsRepository;
