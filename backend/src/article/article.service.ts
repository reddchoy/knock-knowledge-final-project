import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto, EditArticleDto } from './dto';

export interface HandclapCount {
  total_count: number;
  username: string;
  article_id: number;
}

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  getArticles() {
    return this.prisma.articles.findMany({
      where:{
        NOT:{
          status:"off_board"
        }
      },
      orderBy:{
        id:"desc"
      },
      include: {
        owner: {
          select: {
            username: true,
            userProfiles: { select: { icon: true, name: true } },
          },
        },

        category: { select: { name: true } },
      },
    });
  }

  getActicleById(articleId: number) {
    return this.prisma.articles.findUnique({
      where: {
        id: articleId,
      },
      include: {
        owner: {
          select: {
            username: true,
            userProfiles: true,
          },
        },
      },
    });
  }

  async createArticle(
    ownerId: number,
    file: Express.Multer.File,
    createArticleDto: CreateArticleDto
  ) {
    const article = await this.prisma.articles.create({
      data: {
        ownerId,
        coverImage: file.filename,
        title: createArticleDto.title,
        content: createArticleDto.content,
        status: createArticleDto.status,
      },
    });

    return { message: 'article created successfully', article };
  }

  async editArticleById(
    articleId: number,
    ownerId: number,
    editArticleDto: EditArticleDto,
    file: Express.Multer.File
  ) {
    const article = await this.prisma.articles.findUnique({
      where: {
        id: articleId,
      },
    });
    if (!article || article.ownerId !== ownerId)
      throw new ForbiddenException('The article does not exist!');

    return this.prisma.articles.update({
      where: {
        id: articleId,
      },
      data: {
        coverImage: file.filename,
        title: editArticleDto.title,
        content: editArticleDto.content,
        categoryId: editArticleDto.categoryId,
      },
    });
  }

  async getHandclaps(articleId: number) {
    let handclapCounts: HandclapCount[] = await this.prisma
      .$queryRaw`SELECT SUM(handclaps.count) AS total_count, users.username, handclaps.article_id FROM handclaps JOIN users ON handclaps.user_id = users.id WHERE handclaps.article_id = ${articleId} GROUP BY handclaps.user_id, users.username, handclaps.article_id`;

    for (let handclapCount of handclapCounts) {
      handclapCount.total_count = Number(handclapCount.total_count);
    }

    return handclapCounts;
  }

  async createHandclap(userId: number, articleId: number) {
    const article = await this.prisma.articles.findUnique({
      where: {
        id: articleId,
      },
    });

    if (!article || article.id !== articleId)
      throw new ForbiddenException('The article does not exist, you cannot clap!');

    const handclap = await this.prisma.handclaps.create({
      data: { count: 1, articleId, userId },
    });

    return { message: 'handclap created successfully', handclap };
  }

  // =========Bookmark=========
  async createArticleBookmark(userId: number, articleId: number) {
    const article = await this.prisma.articles.findUnique({
      where: {
        id: articleId,
      },
    });

    if (!article || article.id !== articleId)
      throw new ForbiddenException('The article does not exist, you cannot bookmark!');

    const bookmarkArticle = await this.prisma.bookMarks.create({
      data: { userId, articleId },
    });

    return { message: 'article bookmarked successfully', bookmarkArticle };
  }

  async deleteArticleBookmark(userId: number, articleBookmarkId: number) {
    const articleBookmark = await this.prisma.bookMarks.findUnique({
      where: {
        id: articleBookmarkId,
      },
    });

    if (!articleBookmark || articleBookmark.id !== articleBookmarkId)
      throw new ForbiddenException('The article bookmark does not exist, you cannot bookmark!');

    await this.prisma.bookMarks.delete({
      where: {
        id: articleBookmarkId,
      },
    });

    return { message: 'article bookmark deleted successfully' };
  }
}
