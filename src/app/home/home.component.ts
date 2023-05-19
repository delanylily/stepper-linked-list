import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { map, Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { Book } from '../models/book';
import { UserService } from '../services/user.service';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, OnDestroy {
  bookList: Book[] = [];
  data: any;
  favouritesSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;
  user$: any;

  constructor(private readonly router: Router, private readonly authService: AuthService, private readonly dataService: DataService, private userService: UserService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.pipe(
      map(user => {
        this.userId = user.uid;
        this.user$ = this.userService.getUser(this.userId);
        this.getUserFavourites();
      })
    ).subscribe();
  }

  getUserFavourites() {
    this.favouritesSubscription = this.dataService.getUserFavourites(this.userId).subscribe(books => {
      this.bookList = books;
    });
  }

  navigateToUserProfile(bookOwnerId): void {
    this.router.navigate(['user', bookOwnerId]);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.favouritesSubscription.unsubscribe();
  }

}
