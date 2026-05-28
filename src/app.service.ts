import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Precios } from './entity/prices.entity';

@Injectable()
export class AppService {
  constructor( 
    @InjectRepository(Precios) private readonly preciosRepo: Repository<Precios>, 
  ) {}

  getPrice(id: number) {
    return this.preciosRepo.findOneBy({id});
  }

  async patchPrice(id: number, precio: number) {
    await this.preciosRepo.update(id, { precio });
    return { message: 'Precio actualizado', id, precio };
  }
}
