import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Musician } from '../musician/musician.entity';

@Entity('genre')
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @OneToMany(() => Musician, (musician) => musician.genre)
  musicians: Musician[];
}
