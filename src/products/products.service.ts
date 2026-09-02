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

  findByCategory(category: string) {
    return this.repo.find({ where: { category } });
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
}
