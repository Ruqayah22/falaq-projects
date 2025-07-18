import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
// import { create } from '../node_modules/@types/istanbul-reports/index.d';
import { InputsSchema } from './register/register.module';

@Controller('submit')
export class AppController {
  constructor(private readonly appService: AppService) {}
// @Post()
//   handleSubmit(@Body() input: InputsSchema) {
//     return this.appService.saveForm(input);
//   }
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Get()
  getAllInputs(): InputsSchema[] {
    return this.appService.getAllInputs();
  }
  //  @Post()
  // create(
  //   @Body('firstName')firstName: string,
  //   @Body('lastName')lastName: string,
  //   @Body('email')email: string,
  //   @Body('password')password: string,
  // ): InputsSchema {
  //   return this.appService.createInput(firstName,lastName,email,password);
  // }

  @Post()
  create(@Body() input: InputsSchema): InputsSchema{
    return this.appService.createInput(input);
  }
}

