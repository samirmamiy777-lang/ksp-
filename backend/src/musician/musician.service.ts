import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Musician } from './musician.entity';
import { CreateMusicianDto, UpdateMusicianDto } from './musician.dto';

@Injectable()
export class MusicianService {
  constructor(
    @InjectRepository(Musician)
    private readonly repo: Repository<Musician>,
  ) {}

  findAll(): Promise<Musician[]> {
    return this.repo.find({ relations: ['genre', 'albums'], order: { full_name: 'ASC' } });
  }

  async findOne(id: number): Promise<Musician> {
    const m = await this.repo.findOne({ where: { id }, relations: ['genre', 'albums'] });
    if (!m) throw new NotFoundException(`Музыкант #${id} не найден`);
    return m;
  }

  create(dto: CreateMusicianDto): Promise<Musician> {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateMusicianDto): Promise<Musician> {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }
}
