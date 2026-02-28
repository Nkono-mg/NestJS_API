import {
  IsString,
  IsNotEmpty,
  IsEnum,
  MinLength,
  Matches,
  IsOptional,
  IsJSON,
  IsUrl,
  IsISO8601,
  IsArray,
  MaxLength,
} from 'class-validator';
import { postTypeEnum } from '../enums/postType.enum';
import { postStatusEnum } from '../enums/postStatus.enum';
import { MetaOptionArticleDTO } from './create-article-meta-option.dto';
import { Type } from 'class-transformer';

export class CreateArticleDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  title: string;

  @IsEnum(postTypeEnum)
  @IsNotEmpty()
  postType: postTypeEnum;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  slug: string;

  @IsEnum(postStatusEnum)
  @IsNotEmpty()
  status: postStatusEnum;

  @IsJSON()
  @IsOptional()
  schema?: string;

  @IsUrl()
  @IsOptional()
  @MaxLength(1024)
  featuredImageUrl?: string;

  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(2, { each: true })
  tags?: string[];

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content?: string;

  @IsOptional()
  @IsArray()
  @Type(() => MetaOptionArticleDTO)
  metaOptions?: MetaOptionArticleDTO[];
}
