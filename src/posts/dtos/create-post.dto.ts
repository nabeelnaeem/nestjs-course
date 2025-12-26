import {
  IsArray,
  IsDate,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';
import { PostType } from '../enums/postType.enum';
import { PostStatus } from '../enums/postStatus.enum';

export class CreatePostDto {
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  title: string;

  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  slug: string;

  @IsEnum(PostStatus)
  @IsNotEmpty()
  status: PostStatus;

  @IsString()
  @IsOptional()
  content?: string;

  @IsOptional()
  @IsJSON()
  schema?: string;

  @IsUrl()
  @IsOptional()
  featuredImageUrl?: string;

  @IsISO8601()
  @IsOptional()
  publishedOn: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true }) //For each value of array, make sure it is string
  @MinLength(3, { each: true }) //Same as above
  tags: string[];

  metaOptions: [];
}
