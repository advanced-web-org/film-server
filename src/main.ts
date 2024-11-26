import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'films', // Match the package name in films.proto
        protoPath: join(__dirname, 'films/films.proto'), // Path to the .proto file
      },
    });

  await microservice.listen();
  await app.listen(4000);
}
bootstrap();
