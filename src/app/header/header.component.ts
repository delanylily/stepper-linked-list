import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  menuItemSelected: string;
  constructor(private auth: AuthService, private router: Router, private toastr: HotToastService) { }

  ngOnInit() {
    this.menuItemSelected = 'home';
  }

  onNavigate(item) {
    this.router.navigateByUrl(`/${item}`);
    this.menuItemSelected = item;
  }

  logout() {
    // this.auth.logout();
    this.auth.signOut().pipe(
      this.toastr.observe({
        success: 'Logout success',
        loading: 'Logging out...'
      })
    ).subscribe(() => {
      this.router.navigate(['/auth']);
    });
  }
}
