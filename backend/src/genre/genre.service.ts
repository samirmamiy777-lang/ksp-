import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './genre.entity';
import { CreateGenreDto, UpdateGenreDto } from './genre.dto';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly repo: Repository<Genre>,
  ) {}

  findAll(): Promise<Genre[]> {
    return this.repo.find({ order: { name: 'ASC' } });
  }

  async findOne(id: number): Promise<Genre> {
    const genre = await this.repo.findOne({ where: { id } });
    if (!genre) throw new NotFoundException(`Жанр #${id} не найден`);
    return genre;
  }

  create(dto: CreateGenreDto): Promise<Genre> {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateGenreDto): Promise<Genre> {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }
}
