import { Controller, Get, Param, Patch } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(":id")
  getPrice(@Param('id') id: number) {
    return this.appService.getPrice(id);
  }

  @Patch(":id/:price")
  patchPrice(@Param('id') id: number, @Param('price') price: number) {
    return this.appService.patchPrice(id, price);
  }
}
