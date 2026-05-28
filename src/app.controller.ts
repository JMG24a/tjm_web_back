import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(":id")
  getPrice(@Param('id') id: number) {
    return this.appService.getPrice(id);
  }

  @Patch()
  patchPrice(@Body() body: { id: number; precio: number }) {
    return this.appService.patchPrice(body.id, body.precio);
  }
}