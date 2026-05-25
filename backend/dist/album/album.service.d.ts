import { Repository } from 'typeorm';
import { Album } from './album.entity';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
export declare class AlbumService {
    private readonly repo;
    constructor(repo: Repository<Album>);
    findAll(): Promise<Album[]>;
    findOne(id: number): Promise<Album>;
    findByMusician(musicianId: number): Promise<Album[]>;
    create(dto: CreateAlbumDto): Promise<Album>;
    update(id: number, dto: UpdateAlbumDto): Promise<Album>;
    remove(id: number): Promise<void>;
}
