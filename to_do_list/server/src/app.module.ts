import { Module } from '@nestjs/common';
import { ToDoController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [ToDoController],
  providers: [AppService],
})
export class AppModule {}
