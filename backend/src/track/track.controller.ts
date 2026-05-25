import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';

@Controller('tracks')
export class TrackController {
  constructor(private readonly service: TrackService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Get('by-album/:albumId')
  byAlbum(@Param('albumId') id: string) { return this.service.findByAlbum(+id); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.service.findOne(+id); }

  @Post()
  create(@Body() dto: CreateTrackDto) { return this.service.create(dto); }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTrackDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.service.remove(+id); }
}
