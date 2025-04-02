import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoId } from './todo.model';
import { Todo } from '@prisma/client';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: TodoId): Promise<Todo> {
    const todo = await this.todoService.findOne(id);
    if (!todo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    return todo;
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(createTodoDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: TodoId,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    const updatedTodo = await this.todoService.update(id, updateTodoDto);
    if (!updatedTodo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    return updatedTodo;
  }

  @Delete(':id')
  async remove(@Param('id') id: TodoId): Promise<{ success: boolean }> {
    const isDeleted = await this.todoService.remove(id);
    return { success: isDeleted };
  }
}
