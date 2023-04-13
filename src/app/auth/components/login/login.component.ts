import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService, private readonly toastr: HotToastService, private readonly router: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.email === '') {
      alert('Please enter email');
      return;
    }
    if (this.password === '') {
      alert('Please enter password');
      return;
    }
    this.auth.signIn(this.email, this.password).pipe(
      this.toastr.observe({
        success: 'Logged in successfully',
        loading: 'Logging in...',
        error: ({ message }) => `there was an error: ${message}`
      })
    ).subscribe(() => {
      this.router.navigate(['/home']);
    });
    this.email = '';
    this.password = '';
  }

  // signInWithGoogle() {
  //   this.auth.signInWithGoogle();
  // }

}
