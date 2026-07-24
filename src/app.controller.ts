import { BadRequestException, Body, Controller, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCarouselDto } from './entity/create-carousel.dto';
import { UpdateCarouselDto } from './entity/carousel.edit.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(":id")
  getPrice(@Param('id') id: number) {
    return this.appService.getPrice(id);
  }

  @Patch()
  patchPrice(@Body() body: { id: number; precio: number }) {
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

  @Patch("carrusel/:id")
  updateCarousel(
    @Param("id") id: number,
    @Body() dto: UpdateCarouselDto
  ) {
    return this.appService.updateCarousel(id, dto);
  }

}