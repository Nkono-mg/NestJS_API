import { Injectable } from '@nestjs/common';
import { CreateArticleDTO } from './dto/create.article.dto';
import { Repository } from 'typeorm';
import { ArticleEntity } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../users/user.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepositor: Repository<ArticleEntity>,
    private readonly userService: UserService,
  ) {}

  async createArticle(dataForm: CreateArticleDTO) {
    console.log(dataForm);
  }

  async getAllArticles(limit: number, page: number) {
    //find article created by user
    //if exist
    //return aull posts
    return [
      {
        id: 12,
        title: 'titre de article',
        content: 'contenu de article',
      },
    ];
  }
}
