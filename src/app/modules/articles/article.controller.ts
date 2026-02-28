import {
  Controller,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  Get,
  Post,
  Body,
  HttpCode,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateArticleDTO } from './dto/create.article.dto';

@Controller('articles')
@ApiTags('Articles') //pour dire à la documentation tout ce qui concerne Article est  groupé dans Articles
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('all')
  public getAllArticles(
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.articleService.getAllArticles(limit, page);
  }
  @Post('create')
  @HttpCode(201)
  ceateArticle(@Body() dataForm: CreateArticleDTO) {
    return this.articleService.createArticle(dataForm);
  }
}
