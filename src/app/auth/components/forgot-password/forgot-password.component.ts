import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.less']
})
export class ForgotPasswordComponent implements OnInit {
  email: string = '';

  constructor(private readonly auth: AuthService, private readonly toastr: HotToastService, private router: Router) { }

  ngOnInit(): void { }

  forgotPassword() {
    this.auth.forgotPassword(this.email).pipe(
      this.toastr.observe({
        success: 'Recovery email sent! Please check your email',
        error: ({ message }) => `there was an error: ${message}`
      })).subscribe(() => {
        setTimeout(() => {
          this.router.navigate(['/auth']);
        }, 6000)
      });
  }
}
