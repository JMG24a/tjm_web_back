import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

  @Column("text")
  images: string; // "url1|url2|url3"
}
