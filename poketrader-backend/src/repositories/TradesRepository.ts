import { EntityRepository, Repository } from 'typeorm';

import Trade from '../models/Trade';

@EntityRepository(Trade)
class TradesRepository extends Repository<Trade> {}

export default TradesRepository;
