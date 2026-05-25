export class CreateMusicianDto {
  full_name: string;
  birth_date?: string;
  country?: string;
  biography?: string;
  genre_id?: number;
}

export class UpdateMusicianDto {
  full_name?: string;
  birth_date?: string;
  country?: string;
  biography?: string;
  genre_id?: number;
}
