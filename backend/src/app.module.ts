import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreModule } from './genre/genre.module';
import { MusicianModule } from './musician/musician.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get('DB_USER', 'postgres'),
        password: config.get('DB_PASSWORD', 'postgres'),
        database: config.get('DB_NAME', 'musician_db'),
        autoLoadEntities: true,
        synchronize: false, // используем готовую БД из SQL-скрипта
      }),
    }),
    GenreModule,
    MusicianModule,
    AlbumModule,
    TrackModule,
  ],
})
export class AppModule {}
