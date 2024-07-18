import { Injectable, Logger } from '@nestjs/common';
import { CreateUserRequest } from './create-user/create-user.request';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectQueue('create-user-queue') private readonly createUserQueue: Queue,
  ) {}

  private async queueUserForCreation(
    createUserRequest: CreateUserRequest,
  ): Promise<void> {
    const taskQueueId = `create-job_${new Date().toISOString()}`;
    this.createUserQueue.add(taskQueueId, createUserRequest, {
      removeOnComplete: true,
      attempts: Number.MAX_SAFE_INTEGER,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    });
  }

  async createWithoutResilience(
    createUserRequest: CreateUserRequest,
  ): Promise<void> {
    this.logger.log('User created!', createUserRequest)
  }

  async createResilient(
    createUserRequest: CreateUserRequest,
  ): Promise<void> {
    // Put it right into the queue
    await this.queueUserForCreation(createUserRequest);
  }

  async drainQueue(): Promise<void> {
    await this.createUserQueue.pause();
    await this.createUserQueue.drain();
    await this.createUserQueue.resume();
  }
}
