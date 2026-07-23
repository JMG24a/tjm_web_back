import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('carousels')
export class CreateCarouselDto {
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

  @Column({ type: 'varchar', length: 50})
  group: string;
}
