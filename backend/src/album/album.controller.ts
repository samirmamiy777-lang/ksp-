import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';

@Controller('albums')
export class AlbumController {
  constructor(private readonly service: AlbumService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Get('by-musician/:musicianId')
  byMusician(@Param('musicianId') id: string) { return this.service.findByMusician(+id); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.service.findOne(+id); }

  @Post()
  create(@Body() dto: CreateAlbumDto) { return this.service.create(dto); }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAlbumDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.service.remove(+id); }
}
