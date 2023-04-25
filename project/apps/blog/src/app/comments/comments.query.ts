import { IsArray, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_LIMIT, DEFAULT_SORT } from './comments.constant';

export class CommentQuery {
  @Transform(({ value } ) => +value || DEFAULT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_LIMIT;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

  @Transform(({ value }) => value.split(',').map((id: string) => +id))
  @IsArray({})
  @IsOptional()
  public posts: number[];

  @Transform(({ value }) => value.split(',').map((id: string) => id))
  @IsArray({})
  @IsOptional()
  public users: string[];

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sort: 'desc' | 'asc' = DEFAULT_SORT;
}