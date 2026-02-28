import { Module } from '@nestjs/common';
import { ArticleModule } from './app/modules/articles/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './app/modules/articles/entities/article.entity';
import { UserModule } from './app/modules/users/user.module';
import { UserEntity } from './app/modules/users/entities/user.entity';

@Module({
  imports: [
    UserModule,
    ArticleModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres', //data source
        entities: [UserEntity, ArticleEntity], //les entités pour creer des tables dans postgres
        synchronize: true, //creation de table automatiqua dans la base de données
        port: Number(process.env.DB_PORT!),
        username: process.env.DATABASE_USER!,
        database: process.env.DATABASE_NAME!,
        password: process.env.DATABASE_PASSWORD!,
        host: process.env.DATABASE_HOST,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
