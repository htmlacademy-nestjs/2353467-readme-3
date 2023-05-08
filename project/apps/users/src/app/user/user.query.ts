import { IsArray, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_LIMIT, DEFAULT_SORT } from './user.constant';
const ObjectId = require('mongoose').Types.ObjectId;

export class UserQuery {
  @Transform(({ value }) => Number(value) || DEFAULT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_LIMIT;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  public page: number;

  @Transform(({ value }) => value.split(',').map((id: string) => id))
  @IsArray({})
  @IsOptional()
  public users: string[];

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sort: 'desc' | 'asc' = DEFAULT_SORT;
}
