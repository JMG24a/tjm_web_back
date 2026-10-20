import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Precios } from './entity/prices.entity';
import { Carousels } from './entity/carousel.entity';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,

      // Define el esquema predeterminado
      schema: 'public',

      // Solo para desarrollo
      synchronize: true,

      ssl: {
        rejectUnauthorized: false,
      },
    }),

    TypeOrmModule.forFeature([Precios, Carousels]),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

