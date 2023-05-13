import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { map, Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'step-card',
  templateUrl: './step-card.component.html',
  styleUrls: ['./step-card.component.less']
})
export class StepCardComponent implements OnInit, OnDestroy {
  @Input() step: any;
  bookSaveSubscription: Subscription;

  constructor(private readonly dataService: DataService, private authService: AuthService, private readonly toastrService: HotToastService) { }

  ngOnInit() {
  }

  setCurrentActive() {
    if (this.step.value.active && !this.step.next?.value.active || this.step.next === null && this.step.value.active) {
      return true;
    } else {
      return false;
    }
  }

  saveBook(book) {
    this.bookSaveSubscription = this.authService.currentUser$.pipe(
      map(user => {
        this.dataService.addToSaved(book.id, user.uid);
      })
    ).subscribe(() => {
      this.toastrService.success(`Book saved to your favourites!`);
    }, () => this.toastrService.error('Save unsuccessful'));
  }

  ngOnDestroy(): void {
    if (this.bookSaveSubscription) {
      this.bookSaveSubscription.unsubscribe();
    }
  }
}
