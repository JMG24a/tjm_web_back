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

//config cors one
//import { NestFactory } from '@nestjs/core';
//import { AppModule } from './app.module';
//import * as express from 'express';

//async function bootstrap() {
  //const app = await NestFactory.create(AppModule);

  //app.enableCors({
    //origin: 'https://muebleriatiojaime.vercel.app',
    //methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    //allowedHeaders: ['Content-Type', 'Authorization'],
    //credentials: true,
  //});

  // Manejar preflight OPTIONS correctamente
  //app.use((req, res, next) => {
    //if (req.method === 'OPTIONS') {
      //res.header('Access-Control-Allow-Origin', 'https://muebleriatiojaime.vercel.app');
      //res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
      //res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      //return res.sendStatus(200);
    //}
    //next();
  //});

  //await app.listen(process.env.PORT || 3000);
//}
//bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Definimos los dominios permitidos
  const allowedOrigins = [
    'https://muebleriatiojaime.vercel.app',
    'https://muebleriatiojaime.com',
    'https://www.muebleriatiojaime.com', // Agregamos la versión con www por si acaso
  ];

  // 2. Configuramos CORS en NestJS pasándole una función de validación
  app.enableCors({
    origin: (origin, callback) => {
      // Si la petición no tiene origin (como Postman/Server-to-Server) o está en la lista, permitimos
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // 3. Modificamos el middleware para manejar el preflight de forma dinámica
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    
    // Si el origen de la petición está permitido, se lo devolvemos dinámicamente
    if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
    
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.header('Access-Control-Allow-Credentials', 'true');
      return res.sendStatus(200);
    }
    next();
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
