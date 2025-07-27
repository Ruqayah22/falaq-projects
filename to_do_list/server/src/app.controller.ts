import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import type { CreateToDoDto } from './create-toDo.dto';

@Controller('toDo')
export class ToDoController {
  constructor(private appService: AppService) {}

  @Get()
  getAllToDos(): CreateToDoDto[] {
    return this.appService.getAllToDos();
  }

  @Post()
  @HttpCode(201)
  create(@Body() CreateToDoDto: CreateToDoDto) {
    return this.appService.createToDo(CreateToDoDto);
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.appService.findOne(id);
  }
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() toDoUpdate: CreateToDoDto,
  ) {
    return this.appService.update(id, toDoUpdate);
  }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.appService.deleteOne(id);
  }
}
