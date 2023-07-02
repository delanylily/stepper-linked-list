import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  menuItemSelected: string;
  isDropdownOpen = false;

  constructor(private auth: AuthService, private router: Router, private readonly toastService: NgToastService) { }

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
    this.auth.signOut().subscribe(() => {
      this.router.navigate(['/auth']);
      this.toastService.success({ detail: "Logout success", duration: 3000 });
    }, err => this.toastService.error({ detail: err.message, summary: "Logout failed", duration: 5000 }));
  }
}
