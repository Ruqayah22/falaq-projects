import { 
  Controller, 
  Get, 
  Post,
  Body,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Delete} from '@nestjs/common';
import type { CreateProductDto } from './create-cat.dto';
import { AppService } from './app.service';

@Controller('product')
export class CatsController {
  constructor(private appService: AppService) {}

  @Get()
  getAllProducts(): CreateProductDto[] {
    return this.appService.getAllProducts();
  }

  // @Get('post')
  // create(@Body() CreateProductDto: CreateProductDto) {
  //   return this.appService.createProduct(CreateProductDto);
  // }
  @Post()
  @HttpCode(201)
  create(@Body() CreateProductDto: CreateProductDto) {
    return this.appService.createProduct(CreateProductDto);
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.appService.findOne(id);
  }
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() productUpdate: CreateProductDto,
  ) {
    return this.appService.update(id, productUpdate);
  }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.appService.deleteOne(id);
  }
}
