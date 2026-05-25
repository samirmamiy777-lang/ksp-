import { Repository } from 'typeorm';
import { Genre } from './genre.entity';
import { CreateGenreDto, UpdateGenreDto } from './genre.dto';
export declare class GenreService {
    private readonly repo;
    constructor(repo: Repository<Genre>);
    findAll(): Promise<Genre[]>;
    findOne(id: number): Promise<Genre>;
    create(dto: CreateGenreDto): Promise<Genre>;
    update(id: number, dto: UpdateGenreDto): Promise<Genre>;
    remove(id: number): Promise<void>;
}
