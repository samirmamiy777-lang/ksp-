import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto, UpdateGenreDto } from './genre.dto';

@Controller('genres')
export class GenreController {
  constructor(private readonly service: GenreService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.service.findOne(+id); }

  @Post()
  create(@Body() dto: CreateGenreDto) { return this.service.create(dto); }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateGenreDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.service.remove(+id); }
}
