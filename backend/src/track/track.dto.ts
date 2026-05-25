export class CreateTrackDto {
  title: string;
  duration_sec?: number;
  album_id: number;
}
export class UpdateTrackDto {
  title?: string;
  duration_sec?: number;
  album_id?: number;
}
