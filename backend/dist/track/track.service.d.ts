import { Repository } from 'typeorm';
import { Track } from './track.entity';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
export declare class TrackService {
    private readonly repo;
    constructor(repo: Repository<Track>);
    findAll(): Promise<Track[]>;
    findOne(id: number): Promise<Track>;
    findByAlbum(albumId: number): Promise<Track[]>;
    create(dto: CreateTrackDto): Promise<Track>;
    update(id: number, dto: UpdateTrackDto): Promise<Track>;
    remove(id: number): Promise<void>;
}
