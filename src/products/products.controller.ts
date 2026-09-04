import { Controller, Get, Post, Param, Body, Res, HttpStatus, HttpException, Patch } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { Products } from "./product.entity";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

@Get('category/:category')
async findByCategory(@Param('category') category: string) {
  try {
    const products = await this.productsService.findByCategory(category);
    return products; // Nest serializa automáticamente
  } catch (error) {
    console.error('Error in findByCategory:', error);
    throw new HttpException(
      {
        message: 'Error fetching products',
        detail: error?.message ?? null,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(":id")
  async updateProduct(
    @Param("id") id: number,
    @Body() body: Partial<Products>
  ) {
    try {
      console.log("🚀 ~ ProductsController ~ updateProduct ~ body:", id, body)
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
