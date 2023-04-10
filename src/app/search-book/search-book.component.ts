import { Component, OnInit } from '@angular/core';
import { debounce, debounceTime, map, Observable, Subject } from 'rxjs';
import { Book } from '../models/book';
import { BooksService } from '../services/books.service';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.less']
})
export class AddBookComponent implements OnInit {
  book: Book;
  books: Array<Book> = [];
  searchInput: Subject<string> = new Subject();
  selectedBook: any;
  toggleBook: boolean = false;
  index: any;


  myBooks = []

  constructor(private readonly bookService: BooksService, private readonly dataService: DataService) { }

  ngOnInit() {
    this.searchInput.pipe(debounceTime(2000)).subscribe((input) => {
      this.getBooks(input)
    });
  }

  bookSelected(item, index) {
    this.index = index;
    this.toggleBook = !this.toggleBook;
    this.selectedBook = item;
  }

  addToList() {
    // this.myBooks = JSON.parse(localStorage.getItem('books'));
    // this.myBooks.push(this.selectedBook)
    // console.log(this.selectedBook, 'select')
    // this.bookService.bookSelection.next(this.myBooks)
    // localStorage.setItem('books', JSON.stringify(this.myBooks));
    this.addBook();

  }

  addBook() {
    this.dataService.addBook(this.selectedBook)
  }

  getBooks(input) {
    return this.bookService.getBooks(input).pipe(map((response: any) => {
      response.items.map(book => {
        if (book.volumeInfo?.imageLinks) {
          this.book = new Book(book.volumeInfo);
          this.books.push(this.book)
        }
      })
    })).subscribe();
  }

  // getBooks(input): Observable<Book[]> {
  //   return this.bookService.getBooks(input).pipe(
  //     map((response: any) => {
  //       const books: Book[] = [];
  //       response.items.forEach((book: any) => {
  //         const { volumeInfo } = book;
  //         if (volumeInfo?.imageLinks) {
  //           books.push(new Book(volumeInfo));
  //         }
  //       });
  //       return books;
  //     })
  //   );
  // }

  eventHandler(input: string) {
    this.books = [];
    this.searchInput.next(input);
  }

}
