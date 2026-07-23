import { BadRequestException, Body, Controller, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCarouselDto } from './entity/create-carousel.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(":id")
  getPrice(@Param('id') id: number) {
    return this.appService.getPrice(id);
  }

  @Patch()
  patchPrice(@Body() body: { id: number; precio: number }) {
  console.log("🚀 ~ AppController ~ patchPrice ~ body:", body)
  if (!body.id) {
    throw new BadRequestException("El ID es obligatorio");
  }
  if (body.precio === undefined) {
    throw new BadRequestException("El precio es obligatorio");
  }
    return this.appService.patchPrice(body.id, body.precio);
  }

  @Post('actualizar-excel')
  @UseInterceptors(FileInterceptor('file'))
  actualizarExcel(@UploadedFile() file: any) {
    return this.appService.actualizarDesdeExcel(file);
  }

  @Get("carrusel/:group")
  getCarouselsByGroup(@Param("group") group: string) {
    console.log("🚀 ~ AppController ~ getCarouselsByGroup ~ group:", group)
    return this.appService.getCarouselsByGroup(group);
  }

  @Post("carousel")
  createCarousel(@Body() dto: CreateCarouselDto) {
    console.log("🚀 ~ AppController ~ createCarousel ~ dto:", dto)
    return this.appService.createCarousel(dto);
  }
}