import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagRdo } from './rdo/tag.rdo';
import { TagsService } from './tags.service';
import { fillObject } from '@project/util/util-core';
import { TagEntity } from './tags.entity';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {

  constructor(
    private readonly tagsService: TagsService
  ) { }

  // Get all tags

  @ApiResponse({
    type: TagRdo,
    status: HttpStatus.OK,
    description: 'List tags.',
  })
  @Get()
  public findAll() {
    const tags = this.tagsService.findAll();
    return tags.map(item => fillObject(TagRdo, item));
  }

  // Create tag

  @ApiResponse({
    type: CreateTagDto,
    status: HttpStatus.CREATED,
    description: 'Tag successfully add.',
  })
  @Post()
  public create(@Body() tagData: CreateTagDto) {
    const tag = this.tagsService.create(tagData);
    return fillObject(TagRdo, tag);
  }

  // Update tag

  @ApiResponse({
    type: TagRdo,
    status: HttpStatus.OK,
    description: 'Tag updated.',
  })
  @Put(':id')
  public update(@Param('id') id: number, @Body() tagData: CreateTagDto) {
    const tag = this.tagsService.update(id, tagData);
    return fillObject(TagRdo, tag);
  }

  // Destroy tag

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tag remove.',
  })
  @Delete(':id')
  public destroy(@Param('id') id: number) {
    this.tagsService.destroy(id);
  }





}
