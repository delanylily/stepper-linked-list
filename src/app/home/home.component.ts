import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../models/book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  bookList: Book[] = [];
  data: any;
  booksSubscription: Subscription;

  constructor() { }
}
