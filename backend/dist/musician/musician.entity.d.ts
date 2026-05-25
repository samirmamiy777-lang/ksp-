import { Genre } from '../genre/genre.entity';
import { Album } from '../album/album.entity';
export declare class Musician {
    id: number;
    full_name: string;
    birth_date: string;
    country: string;
    biography: string;
    genre: Genre;
    genre_id: number;
    albums: Album[];
}
