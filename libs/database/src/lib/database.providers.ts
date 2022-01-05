import { getDatabaseClient } from './database-client';

export const DB_CONNECTION = 'DB_CONNECTION';

export const databaseProviders = [
  {
    provide: DB_CONNECTION,
    useFactory: async () => await getDatabaseClient(),
  },
];
