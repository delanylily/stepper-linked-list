import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { Subscription, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../styles/auth-styles.less', '../../../../assets/styles/buttons.less']
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';
  isLoggingIn = false;
  loginSubscription: Subscription;

  constructor(private auth: AuthService, private readonly toastr: HotToastService, private readonly router: Router) { }

  ngOnInit() {
  }

  login() {
    this.isLoggingIn = true;
    if (this.email === '') {
      alert('Please enter email');
      return;
    }
    if (this.password === '') {
      alert('Please enter password');
      return;
    }
    this.loginSubscription = this.auth.login(this.email, this.password).pipe(
      this.toastr.observe({
        loading: 'Logging in...',
        success: 'Logged in successfully',
        error: ({ message }) => `there was an error: ${message}`
      })

    ).subscribe(() => this.router.navigate(['/home']));
  }

  signInWithGoogle() {
    this.auth.signInWithGoogle();
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }
}
