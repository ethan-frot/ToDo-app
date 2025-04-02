import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Status } from '@prisma/client';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsEnum(Status)
  status: Status;
}
