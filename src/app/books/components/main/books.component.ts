import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map, Observable, Subscription, switchMap, tap } from 'rxjs';
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
  filteredBooks: any;
  loading: boolean;

  constructor(private readonly authService: AuthService, private router: Router, private readonly dataService: DataService) { }

  ngOnInit() {
    this.loading = true;
    combineLatest([this.authService.user$, this.dataService.getAllBooks()]).pipe(
      map(([user, books]) => {
        return this.filterBooks(user, books);
      })
    ).subscribe();
  }

  filterBooks(user, books) {
    this.booksDataSubscription = combineLatest([this.dataService.getUserFavourites(user.uid), this.dataService.getUserMatches(user.uid)]).pipe(
      map(([favourites, matches]) => {
        const favoriteBookIds = favourites.map(favourite => favourite.id);
        const matchBookIds = matches.map(match => match.matchBook.id);
        return books.filter(book => !favoriteBookIds.includes(book.id) && !matchBookIds.includes(book.id) && book.userId !== user.uid);
      }),
      tap(() => {
        this.loading = false;
      })
    ).subscribe(filteredBooks => this.filteredBooks = filteredBooks);
  }

  addBook() {
    this.router.navigateByUrl('/add-book');
  }

  ngOnDestroy(): void {
    this.booksDataSubscription.unsubscribe();
  }
}
