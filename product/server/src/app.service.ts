import { Injectable } from '@nestjs/common';
import type { CreateProductDto } from './create-cat.dto';

@Injectable()
export class AppService {
  private productItem: CreateProductDto[] = [];
  private nextId: number = 1;

  private getNextId() {
    return this.nextId++;
  }

  getAllProducts(): CreateProductDto[] {
    return this.productItem; // Return in reverse order
  }

  createProduct(inputC: CreateProductDto): CreateProductDto {
    this.productItem.push({ ...inputC, id: this.getNextId() });
    return this.productItem.slice(-1)[0];
  }

  findOne(id: number) {
    return this.productItem.find((item) => item.id === id);
  }
  update(id: number, productUpdate: CreateProductDto) {
    const index = this.productItem.findIndex((item) => item.id === id);
    if (index === -1) return null;

    return (this.productItem[index] = {
      ...this.productItem[index],
      ...productUpdate,
      id: this.productItem[index].id,
    });
  }

  deleteOne(id: number) {
    const index = this.productItem.findIndex((item) => item.id === id);
    if (index === -1) return null; // Not found

    const deleted = this.productItem.splice(index, 1)[0];
    return deleted;
  }
}
