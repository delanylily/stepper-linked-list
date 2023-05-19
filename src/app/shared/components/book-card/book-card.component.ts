import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.less']
})
export class BookCardComponent implements OnInit {
  @Input() bookVM: Book;
  @Output() bookDetails: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  viewDetails(book) {
    this.bookDetails.emit(book);
  }

}
