import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Musician } from '../musician/musician.entity';
import { Track } from '../track/track.entity';

@Entity('album')
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  @Column({ nullable: true })
  release_year: number;

  @ManyToOne(() => Musician, (m) => m.albums, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'musician_id' })
  musician: Musician;

  @Column()
  musician_id: number;

  @OneToMany(() => Track, (t) => t.album)
  tracks: Track[];
}
