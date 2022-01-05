import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { EnvType } from '@hapel/shared';


export const dbConfig = (): MysqlConnectionOptions => ({
  type: 'mysql',
  host: process.env.DATABASE_HOST || '',
  port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  username: process.env.DATABASE_USERNAME || '',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE_DATABASE || '',
  
  synchronize: process.env.ENV_TYPE === EnvType.DEVELOPMENT,
  
  entities: [ __dirname + '/../**/*.entity{.ts,.js}' ],
  migrations: [ __dirname + '/../../../../database/src/migrations/' ],
  cli: {
    migrationsDir: __dirname + '/../../../../database/src/migrations/'
  },
});