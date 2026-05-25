import { MusicianService } from './musician.service';
import { CreateMusicianDto, UpdateMusicianDto } from './musician.dto';
export declare class MusicianController {
    private readonly service;
    constructor(service: MusicianService);
    findAll(): Promise<import("./musician.entity").Musician[]>;
    findOne(id: string): Promise<import("./musician.entity").Musician>;
    create(dto: CreateMusicianDto): Promise<import("./musician.entity").Musician>;
    update(id: string, dto: UpdateMusicianDto): Promise<import("./musician.entity").Musician>;
    remove(id: string): Promise<void>;
}
