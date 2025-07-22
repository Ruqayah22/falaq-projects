import { Module } from '@nestjs/common';
import { CatsController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [AppService],
})
export class AppModule {}
