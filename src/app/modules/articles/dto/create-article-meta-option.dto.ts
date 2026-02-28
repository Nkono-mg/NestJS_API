import { IsString, IsNotEmpty } from 'class-validator';

export class MetaOptionArticleDTO {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  value: any;
}
