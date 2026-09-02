import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsString, IsNumber, IsArray } from "class-validator";

export class CreateProductDto {
  @IsString()
  category: string;

  @IsString()
  modelo: string;

  @IsNumber()
  precio: number;

  @IsString()
  descripcion: string;

  @IsString()
  sku: string;

  @IsArray()
  images: string[];
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  modelo: string;

  @Column("decimal", { precision: 10, scale: 2 })
  precio: number;

  @Column("text")
  descripcion: string;

  @Column()
  sku: string;

  @Column("text", { array: true })
  images: string[];
}
