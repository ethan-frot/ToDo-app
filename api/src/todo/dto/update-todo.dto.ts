import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Status } from '@prisma/client';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
