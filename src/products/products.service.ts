import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Products } from "./product.entity";
import { CreateProductDto } from "./dto/create-product.dto";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly repo: Repository<Products>,
  ) {}

  create(dto: CreateProductDto) {
    const product = this.repo.create(dto);
    return this.repo.save(product);
  }

  async findByCategory(category: string): Promise<Products[]> {
    try {
      // Si usas Postgres, ILike permite case-insensitive
      return await this.repo.createQueryBuilder('p')
        .where('p.category ILIKE :cat', { cat: category })
        .getMany();
    } catch (err) {
      console.error('ProductsService.findByCategory error:', err);
      throw err; // lo re-lanzamos para que el controller lo capture
    }
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
}
