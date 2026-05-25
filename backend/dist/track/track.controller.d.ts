import { TrackService } from './track.service';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
export declare class TrackController {
    private readonly service;
    constructor(service: TrackService);
    findAll(): Promise<import("./track.entity").Track[]>;
    byAlbum(id: string): Promise<import("./track.entity").Track[]>;
    findOne(id: string): Promise<import("./track.entity").Track>;
    create(dto: CreateTrackDto): Promise<import("./track.entity").Track>;
    update(id: string, dto: UpdateTrackDto): Promise<import("./track.entity").Track>;
    remove(id: string): Promise<void>;
}
