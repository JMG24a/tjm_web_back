import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar", nullable: true})
  id_cashea: string;

  @Column('varchar')
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
