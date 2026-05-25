export class CreateAlbumDto {
  title: string;
  release_year?: number;
  musician_id: number;
}
export class UpdateAlbumDto {
  title?: string;
  release_year?: number;
  musician_id?: number;
}
