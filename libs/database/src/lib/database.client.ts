import { createConnection } from 'typeorm';
import { ormConfig } from '../ormconfig';

export const getDatabaseClient = async () => {
  return await createConnection(ormConfig);
};
