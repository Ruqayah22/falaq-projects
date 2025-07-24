import { Injectable } from '@nestjs/common';
import type { InputsSchema } from './register/register.module';
// import { create } from '../node_modules/@types/istanbul-reports/index.d';

@Injectable()
export class AppService {
  private inputsR: InputsSchema[] = [];
  private nextId: number = 1;

  private getNextId() {
    return this.nextId++;
  }

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

  createInput(inputC: InputsSchema): InputsSchema {
    this.inputsR.push({ ...inputC, id: this.getNextId() });
    return this.inputsR.slice(-1)[0];
  }

  findOne(id: number) {
    return this.inputsR.find((item) => item.id === id);
  }
  update(id: number, inputU: InputsSchema) {
    const index = this.inputsR.findIndex((item) => item.id === id);
    if (index === -1) return null;

    return (this.inputsR[index] = inputU);
    // this.inputsR.push({ ...inputU, id: this.getNextId() });
    // return this.inputsR.slice(-1)[0];
  }

  deleteOne(id: number) {
    const index = this.inputsR.findIndex((item) => item.id === id);
    if (index === -1) return null; // Not found

    const deleted = this.inputsR.splice(index, 1); // [0]
    return deleted;
  }
  // deleteOne(id: number) {
  //   const item = this.inputsR.find((item) => item.id === id);
  //   if (!item) return null;

  //   this.inputsR = this.inputsR.filter((item) => item.id !== id);
  //   return item;
  // }
  //   update()
}
