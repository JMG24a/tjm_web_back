import { IsString, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class CreateProductDto {
  @IsString()
  category: string;

  @IsString()
  modelo: string;

  @Type(() => Number)
  @IsNumber()
  precio: number;

  @IsString()
  descripcion: string;

  @IsString()
  sku: string;

  @IsString()
  images: string; // "url1|url2|url3"
}
