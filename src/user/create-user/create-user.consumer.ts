import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger, Scope } from '@nestjs/common';

@Processor({
  name: 'create-user-queue',
  scope: Scope.REQUEST,
})
export class CreateUserConsumer extends WorkerHost {

  async process(job: Job<any, any, string>): Promise<any> {
    console.info(job.data);
  }
}
