import { IsOptional, IsString } from 'class-validator';

export class UpdateCarouselDto {
  @IsString()
  @IsOptional()
  mobile?: string;

  @IsString()
  @IsOptional()
  tablet?: string;

  @IsString()
  @IsOptional()
  desktop?: string;

  @IsString()
  @IsOptional()
  alt?: string;
}
