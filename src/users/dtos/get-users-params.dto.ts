import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUsersParamsDto {
  @ApiPropertyOptional({
    description: 'Get user with a specific ID',
    example: 1234,
  })
  @IsOptional()
  @IsInt()
  //Since params and query are always received as string,
  //we need to explicitly tell to transform it to number
  @Type(() => Number)
  id?: number;
}
