import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../../styles/auth-styles.less', '../../../../assets/styles/buttons.less']
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private readonly auth: AuthService, private router: Router, private readonly toastService: NgToastService) { }

  forgotPassword(): void {
    this.auth.forgotPassword(this.email).subscribe(() => {
      this.toastService.success({ detail: "Recovery email sent! Please check your email", duration: 4000 });
      setTimeout(() => {
        this.router.navigate(['/auth']);
      }, 6000);
    }, error => this.toastService.error({ detail: error.message, summary: "An error Occurred", duration: 5000 })
    );
  }
}
