import { Repository } from 'typeorm';
import { Musician } from './musician.entity';
import { CreateMusicianDto, UpdateMusicianDto } from './musician.dto';
export declare class MusicianService {
    private readonly repo;
    constructor(repo: Repository<Musician>);
    findAll(): Promise<Musician[]>;
    findOne(id: number): Promise<Musician>;
    create(dto: CreateMusicianDto): Promise<Musician>;
    update(id: number, dto: UpdateMusicianDto): Promise<Musician>;
    remove(id: number): Promise<void>;
}
