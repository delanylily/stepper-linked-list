import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { combineLatest, concatMap, forkJoin, map, mergeMap, Observable, Subscription, take, tap, toArray } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { Book } from '../models/book';
import { UserService } from '../services/user.service';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less', '../../assets/styles/buttons.less']
})
export class HomeComponent implements OnInit, OnDestroy {
  bookList: Book[] = [];
  data: any;
  favouritesSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;
  user$: any;
  bookDetailsSubscription: Subscription;
  matches;
  constructor(private readonly router: Router, private readonly authService: AuthService, private readonly dataService: DataService, private userService: UserService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.pipe(
      map(user => {
        this.userId = user.uid;
        this.user$ = this.userService.getUser(this.userId);
        this.getUserFavourites();
        this.getUserMatches();
      })
    ).subscribe();
  }

  getUserMatches() {
    this.dataService.getUserMatches(this.userId).subscribe(matches => {
      this.matches = matches;
    });
  }

  getUserFavourites() {
    this.favouritesSubscription = this.dataService.getUserFavourites(this.userId).pipe(
      map(fav => {
        fav.map(book => {
          this.getBookDetails(book);
        });
      }),
    ).subscribe();
  }

  getBookDetails(book) {
    this.bookDetailsSubscription = this.dataService.getUserBook(book.userId, book.id).pipe(
      map(book => {
        this.bookList.push(book);
      }),
      take(1)
    ).subscribe();
  }

  navigateToUserProfile(bookOwnerId): void {
    this.router.navigate(['user', bookOwnerId]);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    if (this.favouritesSubscription) {
      this.favouritesSubscription.unsubscribe();
    }
    if (this.bookDetailsSubscription) {
      this.bookDetailsSubscription.unsubscribe();
    }
  }
}
