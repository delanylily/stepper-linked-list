import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, switchMap, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../styles/auth-styles.less', '../../../../assets/styles/buttons.less']
})
export class RegisterComponent implements OnDestroy {
  registerForm: FormGroup;
  registerSubscription: Subscription;

  constructor(private auth: AuthService, private userService: UserService, private router: Router, private readonly toastService: NgToastService) {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      const displayName = this.registerForm.controls['username'].value;
      const email = this.registerForm.controls['email'].value;
      this.registerSubscription = this.auth.signUp(this.registerForm.value).pipe(
        switchMap(({ user: { uid } }) => this.userService.addUser({ uid, email, displayName })),
        tap(() => {
          this.toastService.success({ detail: "Registration Successful, Please login", duration: 3000 });
          this.router.navigate(['/auth']);
        }),
        catchError(error => {
          this.toastService.error({ detail: error.message, summary: "Registration failed", duration: 5000 });
          return throwError(error);
        })
      ).subscribe();
    }
  }

  ngOnDestroy(): void {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }
}
