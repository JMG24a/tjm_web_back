import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post('actualizar-excel')
  @UseInterceptors(FileInterceptor('file'))
  actualizarExcel(@UploadedFile() file: any) {
    return this.appService.actualizarDesdeExcel(file);
  }
}