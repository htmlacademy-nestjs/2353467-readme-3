import { IsArray, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_POST_LIMIT, DEFAULT_SORT } from './posts.constant';
import { PostType } from '@project/shared/app-types';

export class PostQuery {
  @Transform(({ value } ) => +value || DEFAULT_POST_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POST_LIMIT;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

  @Transform(({ value }) => value.split(',').map((id: string) => +id))
  @IsArray({})
  @IsOptional()
  public tags: number[];

  @Transform(({ value }) => value.split(',').map((id: string) => id))
  @IsArray({})
  @IsOptional()
  public users: string[];

  @Transform(({ value }) => value.split(',').map((type: string) => type))
  @IsArray({})
  @IsOptional()
  public types: PostType;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sort: 'desc' | 'asc' = DEFAULT_SORT;
}