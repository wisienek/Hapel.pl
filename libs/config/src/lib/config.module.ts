import { Module } from '@nestjs/common';
import { ConfigModule as CFM } from '@nestjs/config';

import { dbConfig } from './database';


@Module({
  imports: [
    CFM.forRoot({
      isGlobal: true,
      load: [ dbConfig ],
    })
  ],
})
export class ConfigModule {}
