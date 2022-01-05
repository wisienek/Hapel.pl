import * as fs from 'fs';
import { baseOrmConfig } from '@hapel/database';

export default async function createOrmConfig() {
  console.info(`Creating ORM Config file...`);

  try {
    fs.unlinkSync('ormconfig.json');
  } catch {}

  fs.writeFileSync('ormconfig.json', JSON.stringify(baseOrmConfig(), null, 2));
  console.log('ormconfig.json has been created.');

  return { success: true };
}

createOrmConfig();
