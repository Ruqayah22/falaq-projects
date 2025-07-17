import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { InputsSchema } from './register/register.module';


@Module({
  // imports: [InputsSchema],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
