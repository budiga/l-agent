import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';

@Module({
  controllers: [BookController],
  providers: [
    BookService,
    {
      provide: 'BOOK_REPOSITORY',
      useFactory() {
        const books: { id: number; title: string }[] = [
          { id: 1, title: '天龙八部'},
          { id: 2, title: '射雕英雄传'},
          { id: 3, title: '神雕侠侣'},
        ]
        return {
          findAll: () => [...books]
        }
      }
    }
  ],
})
export class BookModule {}
