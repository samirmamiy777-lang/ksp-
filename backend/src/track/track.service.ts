import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './track.entity';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly repo: Repository<Track>,
  ) {}

  findAll(): Promise<Track[]> {
    return this.repo.find({ relations: ['album', 'album.musician'], order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Track> {
    const t = await this.repo.findOne({ where: { id }, relations: ['album'] });
    if (!t) throw new NotFoundException(`Трек #${id} не найден`);
    return t;
  }

  findByAlbum(albumId: number): Promise<Track[]> {
    return this.repo.find({ where: { album_id: albumId }, order: { id: 'ASC' } });
  }

  create(dto: CreateTrackDto): Promise<Track> {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateTrackDto): Promise<Track> {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }
}
