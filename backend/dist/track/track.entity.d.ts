import { Album } from '../album/album.entity';
export declare class Track {
    id: number;
    title: string;
    duration_sec: number;
    album: Album;
    album_id: number;
}
