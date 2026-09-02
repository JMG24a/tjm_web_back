import { IsString, IsNumber } from "class-validator";

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

  @IsString()
  images: string; // "url1|url2|url3"
}
