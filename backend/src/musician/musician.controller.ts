import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { MusicianService } from './musician.service';
import { CreateMusicianDto, UpdateMusicianDto } from './musician.dto';

@Controller('musicians')
export class MusicianController {
  constructor(private readonly service: MusicianService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.service.findOne(+id); }

  @Post()
  create(@Body() dto: CreateMusicianDto) { return this.service.create(dto); }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMusicianDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.service.remove(+id); }
}
