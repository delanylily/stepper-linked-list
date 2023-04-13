import { Component, OnInit } from '@angular/core';
import { debounceTime, map, Subject } from 'rxjs';
import { Book } from '../../../models/book';
import { BooksService } from '../../../services/books.service';
import { DataService } from '../../../shared/data.service';

@Component({
  selector: 'search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.less']
})
export class SearchBookComponent implements OnInit {
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
    // localStorage.setItem('books', JSON.stringify(this.myBooks));
    // this.myBooks.push(this.selectedBook)
    // this.bookService.bookSelection.next(this.myBooks)
    this.addBook();
  }

  addBook() {
    this.dataService.addBook(this.selectedBook);
  }

  getBooks(input) {
    return this.bookService.getBooks(input).pipe(map((response: any) => {
      response.items.map(book => {
        if (book.volumeInfo?.imageLinks) {
          this.book = new Book(book.volumeInfo);
          this.books.push(this.book);
        }
      })
    })).subscribe();
  }

  eventHandler(input: string) {
    this.books = [];
    this.searchInput.next(input);
  }
}
