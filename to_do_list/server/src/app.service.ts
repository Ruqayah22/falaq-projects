import { Injectable } from '@nestjs/common';
import type { CreateToDoDto } from './create-toDo.dto';

@Injectable()
export class AppService {
  private toDoItem: CreateToDoDto[] = [];
  private nextId: number = 1;

  private getNextId() {
    return this.nextId++;
  }

  getAllToDos(): CreateToDoDto[] {
    return this.toDoItem; // Return in reverse order
  }

  createToDo(inputC: CreateToDoDto): CreateToDoDto {
    this.toDoItem.push({ ...inputC, id: this.getNextId() });
    return this.toDoItem.slice(-1)[0];
  }

  findOne(id: number) {
    return this.toDoItem.find((item) => item.id === id);
  }
  update(id: number, toDoUpdate: CreateToDoDto) {
    const index = this.toDoItem.findIndex((item) => item.id === id);
    if (index === -1) return null;

    return (this.toDoItem[index] = {
      ...this.toDoItem[index],
      ...toDoUpdate,
      id: this.toDoItem[index].id,
    });
  }

  deleteOne(id: number) {
    const index = this.toDoItem.findIndex((item) => item.id === id);
    if (index === -1) return null; // Not found

    const deleted = this.toDoItem.splice(index, 1)[0];
    return deleted;
  }
}
