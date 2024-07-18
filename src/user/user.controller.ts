import {
  Controller,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest } from './create-user/create-user.request';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() createUserRequest: CreateUserRequest,
  ): Promise<void> {
      const user = await this.userService.createResilient(createUserRequest);
      return user;
  }

  @Delete('admin/queue/drain')
  async drainCreatedUserQueue(): Promise<void> {
    return this.userService.drainQueue();
  }
}
