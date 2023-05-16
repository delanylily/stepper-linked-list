import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map, Observable, Subscription, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.less']
})
export class BooksComponent implements OnInit, OnDestroy {
  booksData: any;
  booksDataSubscription: Subscription;

  constructor(private readonly authService: AuthService, private router: Router, private readonly dataService: DataService) { }

  ngOnInit() {
    this.booksDataSubscription = combineLatest([this.authService.user$, this.dataService.getAllBooks()]).pipe(
      map(([user, books]) => {
        this.booksData = books.filter(book => book.userId !== user.uid);
      })
    ).subscribe();
  }

  addBook() {
    this.router.navigateByUrl('/add-book');
  }

  ngOnDestroy(): void {
    this.booksDataSubscription.unsubscribe();
  }
}
