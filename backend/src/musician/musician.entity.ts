import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Genre } from '../genre/genre.entity';
import { Album } from '../album/album.entity';

@Entity('musician')
export class Musician {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  full_name: string;

  @Column({ type: 'date', nullable: true })
  birth_date: string;

  @Column({ length: 100, nullable: true })
  country: string;

  @Column({ type: 'text', nullable: true })
  biography: string;

  @ManyToOne(() => Genre, (genre) => genre.musicians, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'genre_id' })
  genre: Genre;

  @Column({ nullable: true })
  genre_id: number;

  @OneToMany(() => Album, (album) => album.musician)
  albums: Album[];
}
