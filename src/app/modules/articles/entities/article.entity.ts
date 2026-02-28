import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MetaOptionArticleDTO } from '../dto/create-article-meta-option.dto';
import { postStatusEnum } from '../enums/postStatus.enum';
import { postTypeEnum } from '../enums/postType.enum';

@Entity()
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: postTypeEnum,
    nullable: false,
    default: postTypeEnum.POST,
  })
  postType: postTypeEnum;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'enum',
    enum: postStatusEnum,
    nullable: false,
    default: postStatusEnum.DRAFT,
  })
  status: postStatusEnum;

  @Column({
    type: 'text',
    nullable: true,
  })
  schema?: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  featuredImageUrl?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  publishOn?: Date;

  @Column({
    type: 'text',
    nullable: true,
  })
  content?: string;

  tags?: string[];
  metaOptions?: MetaOptionArticleDTO[];
}
