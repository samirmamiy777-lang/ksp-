import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Album } from '../album/album.entity';

@Entity('track')
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  @Column({ nullable: true })
  duration_sec: number;

  @ManyToOne(() => Album, (a) => a.tracks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'album_id' })
  album: Album;

  @Column()
  album_id: number;
}
