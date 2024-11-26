import { Controller, Get, Logger } from '@nestjs/common';
import { FilmsService } from './films.service';
import { Film } from './film.entity';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { FilmListResponseDto } from './dto/film-list-response.dto';

@Controller('films')
export class FilmsController {
  private readonly logger = new Logger(FilmsController.name);

  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getFilms(): Promise<Film[]> {
    this.logger.log('HTTP GET /films called');
    try {
      return await this.filmsService.getFilms();
    } catch (error) {
      this.logger.error('Error fetching films via HTTP', error.stack);
      throw error;
    }
  }

  @GrpcMethod('FilmsService', 'FindAll')
  async findAll(): Promise<FilmListResponseDto> {
    this.logger.log('gRPC FilmsService.FindAll called');
    try {
      const films = await this.filmsService.getFilms();
      return { films };
    } catch (error) {
      this.logger.error('Error fetching films via gRPC', error.stack);
      throw error;
    }
  }
}
