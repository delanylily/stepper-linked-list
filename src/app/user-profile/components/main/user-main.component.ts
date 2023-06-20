import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { filter, map, Subscription, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.less', '../../../../assets/styles/buttons.less']
})
export class UserMainComponent implements OnInit, OnDestroy {
  user: any;
  userSubscription: Subscription;
  userForm = new FormGroup({
    uid: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    books: new FormControl(''),
    photoUrl: new FormControl('')
  });

  constructor(private authService: AuthService, private readonly userService: UserService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.pipe(
      switchMap(user => {
        return this.userService.getUser(user.uid).pipe(
          tap(user => {
            this.user = user;
          })
        );
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
