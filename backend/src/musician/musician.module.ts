import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Musician } from './musician.entity';
import { MusicianService } from './musician.service';
import { MusicianController } from './musician.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Musician])],
  providers: [MusicianService],
  controllers: [MusicianController],
  exports: [MusicianService],
})
export class MusicianModule {}
