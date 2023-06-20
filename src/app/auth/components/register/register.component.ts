import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../styles/auth-styles.less', '../../../../assets/styles/buttons.less']
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  username: string = '';

  constructor(private auth: AuthService, private userService: UserService, private router: Router, private toastr: HotToastService) { }

  ngOnInit() {
  }

  register() {
    if (this.username === '') {
      alert('Please enter username');
      return;
    }
    if (this.email === '') {
      alert('Please enter email');
      return;
    }
    if (this.password === '') {
      alert('Please enter password');
      return;
    }
    const email = this.email;
    const displayName = this.username;
    this.auth.signUp(this.username, this.email, this.password)
      .pipe(
        switchMap(({ user: { uid } }) => this.userService.addUser({ uid, email, displayName }))
      ).subscribe(() => {
        alert('Registration Successful, Please login');
        this.router.navigate(['/auth']);
      });
    this.email = '';
    this.password = '';
  }
}
