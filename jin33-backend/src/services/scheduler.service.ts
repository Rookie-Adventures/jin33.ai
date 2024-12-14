import { CronJob } from 'cron';
import { SpreadService } from './spread.service';
import logger from '../config/logger';

export class SchedulerService {
  private static instance: SchedulerService;
  private jobs: CronJob[] = [];

  private constructor() {
    this.initializeJobs();
  }

  public static getInstance(): SchedulerService {
    if (!SchedulerService.instance) {
      SchedulerService.instance = new SchedulerService();
    }
    return SchedulerService.instance;
  }

  private initializeJobs(): void {
    // 每天凌晨3点清理过期数据
    this.addJob('0 3 * * *', () => {
      try {
        SpreadService.getInstance().cleanupOldData();
        logger.info('Successfully cleaned up old spread data');
      } catch (error) {
        logger.error('Failed to clean up old spread data:', error);
      }
    });
  }

  private addJob(cronTime: string, onTick: () => void): void {
    const job = new CronJob(cronTime, onTick, null, true, 'Asia/Shanghai');
    this.jobs.push(job);
    logger.info(`Scheduled new cron job: ${cronTime}`);
  }

  public startAll(): void {
    this.jobs.forEach(job => {
      if (!job.running) {
        job.start();
      }
    });
    logger.info('All scheduler jobs started');
  }

  public stopAll(): void {
    this.jobs.forEach(job => {
      if (job.running) {
        job.stop();
      }
    });
    logger.info('All scheduler jobs stopped');
  }
}
