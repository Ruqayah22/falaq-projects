import { 
  Controller, 
  Get, 
  Post,
  // Param,
  Body} from '@nestjs/common';
import type { CreateCatDto } from './create-cat.dto';
// import { AppService } from './app.service';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }

@Controller('cats')
export class CatsController {
  // @Get()
  // findAll(): string {
  //   return 'This action returns all cats';
  // }
  // @Get('oneCat')
  // findByOne(): string {
  //   return 'This action returns one cat';
  // }
  // @Post('createCat')
  // create(): string {
  //   return 'This action adds a new cat';
  // }
  // @Get('createCat')
  // getCreateCat(): string {
  //   return 'This action (GET) adds a new cat — test only';
  // }

  // @Post()
  // create(): string {
  //   return 'This action adds a new cat';
  // }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  // @Get(':id')
  // findOne(@Param() params: any): string {
  //   console.log(params.id);
  //   return `This action returns a #${params.id} cat`;
  // }
  // @Get(':id')
  // findOne(@Param('id') id: string): string {
  //   return `This action returns a #${id} cat`;
  // }

  @Get('post')
  create(@Body() createCatDto: CreateCatDto) {
    // console.log(createCatDto);
    return 'This action adds a new cat';
  }
}
