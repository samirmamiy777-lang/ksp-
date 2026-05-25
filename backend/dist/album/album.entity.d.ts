import { Musician } from '../musician/musician.entity';
import { Track } from '../track/track.entity';
export declare class Album {
    id: number;
    title: string;
    release_year: number;
    musician: Musician;
    musician_id: number;
    tracks: Track[];
}
