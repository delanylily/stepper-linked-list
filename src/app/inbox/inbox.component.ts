import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, map, Observable, startWith, filter } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.less']
})
export class InboxComponent implements OnInit {
  // users$ = this.userService.getAllUsers$;
  // currentUser$: Observable<User>;

  // users: User[];
  // users$: any;
  searchControl = new FormControl('');
  user$ = this.authState.currentUser$;
  otherUsers$ = combineLatest([this.userService.getAllUsers$, this.user$]).pipe(
    map(([users, user]) => users.filter((u) => u.uid !== user?.uid))
  );

  users$ = combineLatest([
    this.otherUsers$,
    this.searchControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([users, searchString]) => {
      return users.filter((user) => {
        user.userDetails?.displayName?.toLowerCase().includes(searchString.toLowerCase());
      });
    })
  );

  constructor(private readonly userService: UserService, private authState: AuthService) { }

  ngOnInit() {


    // this.currentUser$ = this.authState.currentUser$;
    // this.userService.getAllUsers$.subscribe(res => {
    //   this.users = res;
    //   console.log(res, 'all uses');
    // });
  }

}
