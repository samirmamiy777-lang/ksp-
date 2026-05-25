import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './album.entity';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly repo: Repository<Album>,
  ) {}

  findAll(): Promise<Album[]> {
    return this.repo.find({ relations: ['musician', 'tracks'], order: { release_year: 'DESC' } });
  }

  async findOne(id: number): Promise<Album> {
    const a = await this.repo.findOne({ where: { id }, relations: ['musician', 'tracks'] });
    if (!a) throw new NotFoundException(`Альбом #${id} не найден`);
    return a;
  }

  findByMusician(musicianId: number): Promise<Album[]> {
    return this.repo.find({ where: { musician_id: musicianId }, relations: ['tracks'], order: { release_year: 'DESC' } });
  }

  create(dto: CreateAlbumDto): Promise<Album> {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateAlbumDto): Promise<Album> {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }
}
