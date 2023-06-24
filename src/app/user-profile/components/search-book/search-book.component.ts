import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { debounceTime, map, Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/services/user.service';
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
  selectedBookImage: any;
  selectedBook: any;
  toggleBook: boolean = false;
  index: any;
  myBooks = [];
  loading: boolean = false;
  hoverState: boolean;
  activeBook: any;

  constructor(private readonly bookService: BooksService, private readonly dataService: DataService, private authService: AuthService, private toastr: HotToastService) { }

  ngOnInit() {
    this.searchInput.pipe(debounceTime(1000)).subscribe((input) => {
      this.loading = true;
      input.length ? this.getBooks(input) : this.loading = false;
    });
  }

  bookSelected(book, index) {
    this.selectedBook = book;
    this.activeBook = index;
  }

  onBookSaved(availability: string) {
    this.authService.currentUser$.subscribe(res => {
      this.dataService.addBookWithId({ ...this.selectedBook, availability: availability }, res.uid).then(ref => {
        this.toastr.success(`Your book "${this.selectedBook.title}" has been added succesfully!`);
      }, error => {
        this.toastr.error(`There has been an error adding the book: ${error}`);
      });
    });
  }

  getBooks(input) {
    return this.bookService.getBooks(input).pipe(map((response: any) => {
      response.items.map(book => {
        if (book.volumeInfo?.imageLinks) {
          this.book = new Book(book.volumeInfo);
          this.books.push(this.book);
          this.loading = false;
        }
      });
    })).subscribe();
  }

  eventHandler(input: string) {
    this.books = [];
    this.searchInput.next(input);
  }
}
