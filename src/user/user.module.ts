import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { BullModule } from '@nestjs/bullmq';
import { QueueOptions } from 'bullmq';
import { CreateUserConsumer } from './create-user/create-user.consumer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => {
        const opts: QueueOptions = {
          connection: {
            host: process.env.REDIS_HOST as string,
            port: parseInt(process.env.REDIS_PORT as string),
            password: process.env.REDIS_PASSWORD as string,
          },
        };
        return opts;
      },
    }),
    BullModule.registerQueue({
      name: 'create-user-queue',
    }),
  ],
  providers: [UserService, CreateUserConsumer],
  controllers: [UserController],
})
export class UserModule {}
