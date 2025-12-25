import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUsersParamsDto {
  @IsOptional()
  @IsInt()
  //Since params and query are always received as string,
  //we need to explicitly tell to transform it to number
  @Type(() => Number)
  id?: number;
}
