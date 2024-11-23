import { Controller, Get } from '@nestjs/common';
import { FilmsService } from './films.service';
import { Film } from './film.entity';

@Controller('films')
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  @Get()
  getFilms(): Promise<Film[]> {
    return this.filmsService.getFilms();
  }
}
