import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from './film.entity';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,
  ) { }
  
  getFilms(): Promise<Film[]> {
    return this.filmsRepository.find();
  }
}
