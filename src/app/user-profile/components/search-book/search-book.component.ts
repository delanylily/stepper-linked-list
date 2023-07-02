import { Component, OnInit, ViewChild } from '@angular/core';
import { debounceTime, map, Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Book } from '../../../models/book';
import { BooksService } from '../../../services/books.service';
import { DataService } from '../../../shared/data.service';
import { NgToastService } from 'ng-angular-popup';
import { GenericModalComponent } from 'src/app/shared/components/generic-modal/generic-modal.component';

@Component({
  selector: 'search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.less', '../../../../assets/styles/buttons.less']
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
  availability: string;
  @ViewChild('modal') modal: GenericModalComponent;

  constructor(private readonly bookService: BooksService, private readonly dataService: DataService, private authService: AuthService, private readonly toastService: NgToastService) { }

  ngOnInit() {
    this.searchInput.pipe(debounceTime(1000)).subscribe((input) => {
      this.loading = true;
      input.length ? this.getBooks(input) : this.loading = false;
    });
  }

  bookSelected(book, index) {
    this.activeBook = index;
    this.selectedBook = book;
  }

  onAvailabilitySelected(availability): void {
    this.availability = availability;
  }

  onBookSaved() {
    this.authService.currentUser$.subscribe(res => {
      this.dataService.addBookWithId({ ...this.selectedBook, availability: this.availability ? this.availability : 'both' }, res.uid).then(ref => {
        this.toastService.success({ detail: `Your book "${this.selectedBook.title}" has been added succesfully!`, duration: 3000 });
        this.modal.toggleModal();
      }, err => this.toastService.error({ detail: `There has been an error adding the book: ${err}`, duration: 5000 }));
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
