import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
export declare class AlbumController {
    private readonly service;
    constructor(service: AlbumService);
    findAll(): Promise<import("./album.entity").Album[]>;
    byMusician(id: string): Promise<import("./album.entity").Album[]>;
    findOne(id: string): Promise<import("./album.entity").Album>;
    create(dto: CreateAlbumDto): Promise<import("./album.entity").Album>;
    update(id: string, dto: UpdateAlbumDto): Promise<import("./album.entity").Album>;
    remove(id: string): Promise<void>;
}
