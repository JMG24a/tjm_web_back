import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Precios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric', { precision: 10, scale: 2 })
  precio: number;
}
