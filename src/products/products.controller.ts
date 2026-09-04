import { Controller, Get, Post, Param, Body, Res, HttpStatus, Put, HttpException } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { Response } from 'express';
import { Products } from "./product.entity";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get('category/:category')
  async findByCategory(@Param('category') category: string, @Res() res: Response) {
    try {
      const products = await this.productsService.findByCategory(category);
      return res.status(HttpStatus.OK).json(products);
    } catch (error) {
      console.error('Error in findByCategory:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error fetching products',
        detail: error?.message ?? null
      });
    }
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.productsService.findOne(id);
  }

  @Put(":id")
  async updateProduct(
    @Param("id") id: number,
    @Body() body: Partial<Products>
  ) {
    try {
      const updated = await this.productsService.updateProduct(id, body);
      return {
        message: "Producto actualizado correctamente",
        product: updated,
      };
    } catch (error) {
      console.error("Error updating product:", error);
      throw new HttpException(
        "No se pudo actualizar el producto",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
