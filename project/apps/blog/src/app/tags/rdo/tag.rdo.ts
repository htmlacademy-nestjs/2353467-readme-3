import { ApiProperty } from "@nestjs/swagger";
import { Tag } from "@project/shared/app-types";
import { Expose } from "class-transformer";

export class TagRdo implements Tag {

  @ApiProperty({
    description: 'ID tag',
  })
  @Expose({ name: 'id' })
  public id: number;

  @ApiProperty({
    description: 'Tag name',
  })
  @Expose()
  public title: string;


}