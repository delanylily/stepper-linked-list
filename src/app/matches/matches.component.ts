import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { combineLatest, concatMap, forkJoin, map, mergeMap, Observable, Subscription, take, tap, toArray } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { Book } from '../models/book';
import { UserService } from '../services/user.service';
import { DataService } from '../shared/data.service';
import { HotToastService } from '@ngneat/hot-toast';
import { RequestBookModalComponent } from '../home/components/request-book-modal/request-book-modal.component';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.less', '../../assets/styles/buttons.less']
})
export class MatchesComponent implements OnInit, OnDestroy {
  bookList: Book[] = [];
  data: any;
  favouritesSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;
  user$: any;
  bookDetailsSubscription: Subscription;
  matches: Array<any>;
  requestedDetails: { book: Book, user: string; };
  @ViewChild('requestModal') requestModal: RequestBookModalComponent;

  constructor(private readonly toastr: HotToastService, private readonly router: Router, private readonly authService: AuthService, private readonly dataService: DataService, private userService: UserService) { }

  ngOnInit() {
    this.requestedDetails = undefined;
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

  onRequestBook(book): void {
    this.requestedDetails = { book: book, user: this.userId };
    this.requestModal.toggleModal();
  }

  onBookDelete(book) {
    this.dataService.removeFromFavourites(this.userId, book.bookId);
  }

  getUserFavourites() {
    this.favouritesSubscription = this.dataService.getUserFavourites(this.userId).pipe(
      map(fav => {
        fav.map(book => {
          this.bookList.push(book);
        });
      }),
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
