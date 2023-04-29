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
  @Output() saveBook: EventEmitter<null> = new EventEmitter<null>();
  constructor() { }

  ngOnInit() {
  }

  toggleModal() {
    this.isOpen = !this.isOpen;
  }

  onSave() {
    this.saveBook.emit();
    this.isOpen = false;
  }
}
