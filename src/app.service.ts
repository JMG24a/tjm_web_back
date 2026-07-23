import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Precios } from './entity/prices.entity';
import { Carousels } from './entity/carousel.entity';
import * as XLSX from 'xlsx';
import { CreateCarouselDto } from './entity/create-carousel.dto';

@Injectable()
export class AppService {
  constructor( 
    @InjectRepository(Precios) private readonly preciosRepo: Repository<Precios>, 
    @InjectRepository(Carousels) private readonly carouselsRepo: Repository<Carousels>, 
  ) {}

  getPrice(id: number) {
    return this.preciosRepo.findOneBy({id});
  }

  async patchPrice(id: number, precio: number) {
    await this.preciosRepo.update(id, { precio });
    return { message: 'Precio actualizado', id, precio };
  }

  async actualizarDesdeExcel(file: any) {
    // 1. Leer el Excel
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    // 2. Limpiar: eliminar IDs "000"
    const productosFiltrados = rows.filter((row: any) => row.id !== '000');

    // 3. Mapear datos
    const productos = productosFiltrados.map((row: any) => ({
      id: Number(row.id),
      precio: Number(row.precio),
    }));

    // 4. Actualización masiva
    for (const prod of productos) {
      await this.preciosRepo.update(
        { id: prod.id },
        { precio: prod.precio },
      );
    }

    return {
      mensaje: 'Actualización masiva completada',
      totalActualizados: productos.length,
    };
  }

  async getCarouselsByGroup(group: string) {
    console.log("🚀 ~ AppService ~ getCarouselsByGroup ~ group:", group)
    return await this.carouselsRepo.find({
      where: { group },
      order: { id: "ASC" }
    });
  }

  async createCarousel(dto: CreateCarouselDto) {
    const newItem = this.carouselsRepo.create(dto);
    console.log("🚀 ~ AppService ~ createCarousel ~ newItem:", newItem)
    return await this.carouselsRepo.save(newItem);
  }

}
