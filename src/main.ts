
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

async function bootstrap() {
  try {
    const fastifyAdapter = new FastifyAdapter({ logger: true });

    // Serve static files
    fastifyAdapter.register(require('@fastify/static'), {
      root: join(__dirname, '..', 'public'),
    });

    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      fastifyAdapter
    );

    app.enableCors({
      credentials: true,
      origin: "*",
      allowedHeaders: "*"
    });

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    // We need to disable CSP for the simple HTML dashboard to work easily with inline scripts/styles if needed, 
    // or configure it to allow 'self'. The current configuration is strict.
    // Let's relax styleSrc and scriptSrc for 'unsafe-inline' if we write inline JS/CSS in our dashboard.
    app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [`'self'`, `'unsafe-inline'`],
          imgSrc: [`'self'`, `data:`, 'validator.swagger.io', 'img.icons8.com', 'img.shields.io'], // Added external images for README badges if displayed
          scriptSrc: [`'self'`, `'unsafe-inline'`]
        },
      },
      referrerPolicy: {
        policy: 'same-origin',
      },
    }));


    const config = new DocumentBuilder()
      .setTitle('Scheduler Orchestrator')
      .setDescription('The new Version of Scheduler Service powerd by AI Kit')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);

    await app.listen(Number(process.env.CUSTOM_SERVER_PORT) || 3000, '0.0.0.0');
  }
  catch (error) {
    console.error(error);
  }
}
bootstrap();
