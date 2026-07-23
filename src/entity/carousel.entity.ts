import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('carousels')
export class Carousels {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  mobile: string;

  @Column({ type: 'text' })
  tablet: string;

  @Column({ type: 'text' })
  desktop: string;

  @Column({ type: 'text' })
  alt: string;
}
