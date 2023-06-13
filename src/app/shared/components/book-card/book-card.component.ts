import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookDescriptionModalComponent } from 'src/app/user/components/book-description-modal/book-description-modal.component';

@Component({
  selector: 'book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.less', '../../../../assets/styles/buttons.less']
})
export class BookCardComponent implements OnInit {
  @Input() bookVM: Book;
  @Input() cardSettings: { delete: boolean, collection: boolean, request: boolean; };
  @Output() bookDetails: EventEmitter<any> = new EventEmitter<any>();
  @Output() bookDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRequestBook: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') bookDescriptionModal: BookDescriptionModalComponent;

  bookSummaryDetails: any;

  constructor() { }

  ngOnInit() {
    console.log(this.cardSettings);
  }

  viewDetails(book): void {
    this.bookSummaryDetails = book;
    this.bookDescriptionModal.toggleModal();
  }

  removeBook(bookId, userId): void {
    this.bookDelete.emit({ bookId, userId });
  }

  requestBook(): void {
    this.onRequestBook.emit(this.bookVM);
  }
}
