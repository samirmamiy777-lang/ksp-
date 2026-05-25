import { GenreService } from './genre.service';
import { CreateGenreDto, UpdateGenreDto } from './genre.dto';
export declare class GenreController {
    private readonly service;
    constructor(service: GenreService);
    findAll(): Promise<import("./genre.entity").Genre[]>;
    findOne(id: string): Promise<import("./genre.entity").Genre>;
    create(dto: CreateGenreDto): Promise<import("./genre.entity").Genre>;
    update(id: string, dto: UpdateGenreDto): Promise<import("./genre.entity").Genre>;
    remove(id: string): Promise<void>;
}
