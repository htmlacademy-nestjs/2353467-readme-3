import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagRdo } from './rdo/tag.rdo';
import { TagsService } from './tags.service';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {

  constructor(
    private readonly tagsService: TagsService
  ) { }

  // Get list tags

  @ApiResponse({
    type: TagRdo,
    status: HttpStatus.OK,
    description: 'List tags.',
  })
  @Get()
  public findAll() {
    return this.tagsService.findAll();
  }

  // Get tag by id

  @ApiResponse({
    type: TagRdo,
    status: HttpStatus.OK,
    description: 'Tag by ID',
  })
  @Get(':id')
  public find(@Param('id') id: number) {
    return this.tagsService.find(id);
  }

  // Create tag

  @ApiResponse({
    type: CreateTagDto,
    status: HttpStatus.CREATED,
    description: 'Tag added',
  })
  @Post()
  public create(@Body() tagData: CreateTagDto) {
    return this.tagsService.create(tagData);
  }

  // Update tag

  @ApiResponse({
    type: TagRdo,
    status: HttpStatus.OK,
    description: 'Tag updated',
  })
  @Put(':id')
  public update(@Param('id') id: number, @Body() tagData: CreateTagDto) {
    return this.tagsService.update(id, tagData);
  }

  // Remove tag

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tag remove',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public destroy(@Param('id') id: number) {
    this.tagsService.destroy(id);
  }


}
