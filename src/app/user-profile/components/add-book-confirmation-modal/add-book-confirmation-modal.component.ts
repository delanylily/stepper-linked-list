import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'add-book-confirmation-modal',
  templateUrl: './add-book-confirmation-modal.component.html',
  styleUrls: ['./add-book-confirmation-modal.component.less']
})
export class AddBookConfirmationModalComponent implements OnInit {
  isOpen: boolean = false;
  @Input() selectedBook: Book;
  bookAvailability: string;
  @Output() saveBook: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
    this.bookAvailability = 'both';
  }

  toggleModal() {
    this.isOpen = !this.isOpen;
  }

  selectBookAvailability(event: string) {
    this.bookAvailability = event;
  }

  onSave() {
    this.saveBook.emit(this.bookAvailability);
    this.isOpen = false;
  }
}
