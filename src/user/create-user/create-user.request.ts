import { IsString } from 'class-validator';

export class CreateUserRequest {
  @IsString()
  readonly name: string;
}
