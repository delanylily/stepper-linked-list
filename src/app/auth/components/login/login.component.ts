import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../styles/auth-styles.less', '../../../../assets/styles/buttons.less']
})
export class LoginComponent implements OnDestroy {
  loginSubscription: Subscription;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private readonly auth: AuthService, private readonly router: Router, private readonly toastService: NgToastService) { }

  login(): void {
    if (this.loginForm.valid) {
      this.loginSubscription = this.auth.login(this.loginForm.value).subscribe(res => {
        this.toastService.success({ detail: "Logged in successfully", summary: res.message, duration: 3000 });
        this.router.navigate(['/home']);
      }, err => this.toastService.error({ detail: err.message, summary: "Login failed", duration: 5000 }));
    }
  }

  signInWithGoogle(): void {
    this.auth.signInWithGoogle();
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
