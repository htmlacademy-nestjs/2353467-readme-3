import { IsArray, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_POST_LIMIT, DEFAULT_SORT } from './posts.constant';

export class PostQuery {
  @Transform(({ value } ) => +value || DEFAULT_POST_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POST_LIMIT;

  @Transform(({ value }) => value.split(',').map((id) => +id))
  @IsArray({})
  @IsOptional()
  public tags?: number[];

  @Transform(({ value }) => value.split(',').map((id) => id))
  @IsArray({})
  @IsOptional()
  public users?: string[];

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sort: 'desc' | 'asc' = DEFAULT_SORT;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}