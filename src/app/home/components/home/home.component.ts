import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map, Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, OnDestroy {
  booksDataSubscription: Subscription;
  filterSubscription: Subscription;
  filteredBooks: any;
  loading: boolean;

  constructor(private readonly authService: AuthService, private readonly router: Router, private readonly dataService: DataService) { }

  ngOnInit() {
    this.loading = true;
    this.filterSubscription = combineLatest([this.authService.user$, this.dataService.getAllBooks()]).pipe(
      map(([user, books]) => {
        return this.filterBooks(user, books);
      })
    ).subscribe();
  }

  filterBooks(user, books): void {
    const uid = user.uid;
    this.booksDataSubscription = combineLatest([this.dataService.getUserFavourites(uid), this.dataService.getUserMatches(uid), this.dataService.getUserRequests(uid)]).pipe(
      map(([favourites, matches, requests]) => {
        const favoriteBookIds = favourites.map(favourite => favourite.id);
        const matchBookIds = matches.map(match => match.matchBook.id);
        const requestIds = requests.map(request => request.id);
        return books.filter(book => !matchBookIds.includes(book.id) && !favoriteBookIds.includes(book.id) && !requestIds.includes(book.id) && book.userId !== uid);
      }),
      tap(() => this.loading = false)
    ).subscribe(filteredBooks => {
      this.filteredBooks = filteredBooks;
    });
  }

  ngOnDestroy(): void {
    if (this.booksDataSubscription) {
      this.booksDataSubscription.unsubscribe();
    }
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }
}
