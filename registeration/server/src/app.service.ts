import { Injectable } from '@nestjs/common';
import type { InputsSchema } from './register/register.module';
import { create } from '../node_modules/@types/istanbul-reports/index.d';

@Injectable()
export class AppService {
   private inputsR: InputsSchema[] = [];

   getAllInputs(): InputsSchema[] {
    return this.inputsR;
   }
  //  createInput(firstName: string,
  // lastName: string,
  // email: string,
  // password: string,):InputsSchema {
  //   const inputC: InputsSchema = {
  //     firstName,
  // lastName,
  // email,
  // password,
  //   };
  //   this.inputR.push(inputC);
  //   return inputC;
  // }

  createInput(inputC: InputsSchema): InputsSchema{
    this.inputsR.push(inputC);
    return inputC;
  }
  
}
