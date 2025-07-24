import { Body, Controller, Get, Post,HttpCode, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { AppService } from './app.service';
// import { create } from '../node_modules/@types/istanbul-reports/index.d';
import { InputsSchema } from './register/register.module';

@Controller('submit')
export class AppController {
  // constructor(private readonly appService: AppService) {}
  constructor(private appService: AppService) {}
  // @Post()
  //   handleSubmit(@Body() input: InputsSchema) {
  //     return this.appService.saveForm(input);
  //}
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Get()
  // async getAllInputs(): Promise<InputsSchema[]> {
  //   return await this.appService.getAllInputs();
  // }
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
  // create(@Body() input: InputsSchema): InputsSchema[] {
  //   return this.appService.createInput(input);
  // }
  // async create(@Body() input: InputsSchema) {
  //   this.appService.createInput(input);
  // }
  // create(@Body() input: InputsSchema) {
  //   this.appService.createInput(input);
  // }
  @HttpCode(201)
  create(@Body() input: InputsSchema) {
    return this.appService.createInput(input);
  }
  // create(@Body() input: InputsSchema) {
  //   const saved = this.appService.createInput(input);
  //   return { message: 'Input saved', data: saved };
  // }

  @Get(':id')
  // async getAllInputs(): Promise<InputsSchema[]> {
  //   return await this.appService.getAllInputs();
  // }
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.appService.findOne(id);
  }
@Patch(':id')
update(@Param('id', ParseIntPipe) id: number,@Body() inputUpdate: InputsSchema){
  return this.appService.update(id, inputUpdate)
}
  @Delete(':id')
  // async getAllInputs(): Promise<InputsSchema[]> {
  //   return await this.appService.getAllInputs();
  // }
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.appService.deleteOne(id);
  }
}
