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
  isDropdownOpen = false;

  constructor(private auth: AuthService, private router: Router, private toastr: HotToastService) { }

  ngOnInit() {
  }

  onNavigate(item) {
    this.router.navigateByUrl(`/${item}`);
    this.menuItemSelected = item;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
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
