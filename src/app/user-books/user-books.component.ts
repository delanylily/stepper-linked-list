import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { BooksService } from '../services/books.service';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.less']
})
export class UserBooksComponent implements OnInit {
  myBooks: any;

  constructor(private readonly dataService: DataService) { }

  ngOnInit() {
    this.myBooks = JSON.parse(localStorage.getItem('books'));
  }

  deleteBook(book: Book) {
    if (window.confirm('Are you sure you want to delete ' + book.title + ' ?')) {
      this.dataService.deleteBook(book)
    }
  }

}
