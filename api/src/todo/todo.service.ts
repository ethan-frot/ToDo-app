import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoId } from './todo.model';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Status, Todo } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  private sortTodosByStatus(todos: Todo[]): Todo[] {
    const statusPriority = {
      [Status.TODO]: 1,
      [Status.IN_PROGRESS]: 2,
      [Status.ARCHIVED]: 3,
      [Status.DONE]: 4,
    };

    return [...todos].sort((a, b) => {
      const aPriority = statusPriority[a.status] || 999;
      const bPriority = statusPriority[b.status] || 999;
      const statusComparison = aPriority - bPriority;

      if (statusComparison === 0) {
        return a.label.localeCompare(b.label);
      }

      return statusComparison;
    });
  }

  async findAll(): Promise<Todo[]> {
    const todos = await this.prisma.todo.findMany();
    return this.sortTodosByStatus(todos as Todo[]);
  }

  async findOne(id: TodoId): Promise<Todo> {
    const todo = await this.prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return todo as Todo;
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.prisma.todo.create({
      data: createTodoDto,
    }) as unknown as Todo;
  }

  async update(id: TodoId, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    try {
      return (await this.prisma.todo.update({
        where: { id },
        data: updateTodoDto,
      })) as unknown as Todo;
    } catch (error) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }

  async remove(id: TodoId): Promise<boolean> {
    try {
      await this.prisma.todo.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }
}
