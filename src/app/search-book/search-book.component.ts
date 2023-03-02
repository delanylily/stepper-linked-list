import { Component, OnInit } from '@angular/core';
import { debounce, debounceTime, map, Subject } from 'rxjs';
import { Book } from '../models/book';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.less']
})
export class AddBookComponent implements OnInit {
  book: Book;
  books: Array<Book> = [];
  searchInput: Subject<string> = new Subject();

  constructor(private readonly bookService: BooksService) { }

  ngOnInit() {
    this.searchInput.pipe(debounceTime(2000)).subscribe((input) => {
      this.getBooks(input)
    })
    // this.bookService.getBooks('the lean startup').subscribe((response: any) => {
    //   response.items.map(book => {
    //     if (book.volumeInfo?.imageLinks) {
    //       this.book = new Book(book.volumeInfo);
    //       this.books.push(this.book)
    //     }
    //     console.log(this.books, 'books')
    //   })
    // })
  }

  getBooks(input) {
    return this.bookService.getBooks(input).pipe(map((response: any) => {
      response.items.map(book => {
        if (book.volumeInfo?.imageLinks) {
          this.book = new Book(book.volumeInfo);
          this.books.push(this.book)
        }
        console.log(this.books, 'books')
      })
    })).subscribe();
  }

  eventHandler(input: string) {
    this.searchInput.next(input);
  }

}
