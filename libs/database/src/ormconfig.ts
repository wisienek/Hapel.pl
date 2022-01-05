import { ConnectionOptions } from 'typeorm';
import { baseOrmConfig } from './base-orm-config';
// import { } from './entities';

export const ormConfig: ConnectionOptions = {
  ...baseOrmConfig(),
  entities: [],
};
