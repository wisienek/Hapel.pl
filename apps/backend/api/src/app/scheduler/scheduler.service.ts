import { Injectable } from '@nestjs/common';
import { Job, scheduleJob } from 'node-schedule';
import { serverOnlineJob } from './jobs';

@Injectable()
export class SchedulerService {
  private serverOnline: Job;
  private deleteZlane: Job;
  private powiadomLekcje: Job;

  constructor() {
    this.serverOnline = scheduleJob('0 0 20-21 * * *', serverOnlineJob);
  }
}
