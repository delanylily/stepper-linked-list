import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    if (this.email === '') {
      alert('Please enter email');
      return;
    }

    if (this.password === '') {
      alert('Please enter password');
      return;
    }
    const email = this.email;
    this.auth.signUp(this.email, this.password).pipe(
      switchMap(({ user: { uid } }) => this.userService.addUser({ uid, email }))
    ).subscribe(() => {
      alert('Registration Successful, Please verify email');
      this.router.navigate(['/login']);
    });
    // this.auth.signUp(this.email, this.password).pipe(
    //   switchMap(({ user: { uid } }) => this.userService.addUser({ uid: email, email: this.email }))
    // ).subscribe(() => {
    //   alert('Registration Successful, Please verify email');
    //   this.router.navigate(['/login']);
    // });
    this.email = '';
    this.password = '';
  }
}
