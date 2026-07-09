// config railWay
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors({ 
//     origin: ['https://muebleriatiojaime.vercel.app'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     methods: 'GET,POST,PUT,PATCH,DELETE', 
//     credentials: false, 
//   });
//   await app.listen(process.env.PORT || 3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://muebleriatiojaime.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Manejar preflight OPTIONS correctamente
  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', 'https://muebleriatiojaime.vercel.app');
      res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      return res.sendStatus(200);
    }
    next();
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

