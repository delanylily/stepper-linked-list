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
  selectedBook: any;
  toggleBook: boolean = false;
  index: any;
  myBooks = [];

  constructor(private readonly bookService: BooksService, private readonly dataService: DataService, private authService: AuthService, private toastr: HotToastService) { }

  ngOnInit() {
    this.searchInput.pipe(debounceTime(2000)).subscribe((input) => {
      this.getBooks(input);
    });
  }

  bookSelected(item, index) {
    this.index = index;
    this.toggleBook = !this.toggleBook;
    this.selectedBook = item;
  }

  onBookSaved() {
    this.authService.currentUser$.subscribe(res => {
      this.dataService.addBookWithId(this.selectedBook, res.uid).then(ref => {
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
        }
      });
    })).subscribe();
  }

  eventHandler(input: string) {
    this.books = [];
    this.searchInput.next(input);
  }
}
