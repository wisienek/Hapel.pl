import { ConnectionOptions } from 'typeorm';
import { join } from 'path';
import { DbConfig } from '@hapel/configs';

export const baseOrmConfig = (): ConnectionOptions => {
  const dbConfig = new DbConfig();
  return {
    type: 'mysql',
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    username: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
    charset: 'utf8',
    database: dbConfig.DATABASE,
    entities: [join('.', 'entities', '*.entity.{js,ts}')],
    migrationsTableName: 'migrations',
    migrations: [join('.', 'migrations', '*.ts')],
    cli: {
      migrationsDir: join('.', 'migrations'),
    },
  };
};
