import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.less']
})
export class UserBooksComponent implements OnInit {
  myBooks: any;

  constructor() { }

  ngOnInit() {
    this.myBooks = JSON.parse(localStorage.getItem('books'));
  }
}
