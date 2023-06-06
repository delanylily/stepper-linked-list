import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { map, Subscription } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { DataService } from '../../../shared/data.service';
import { RequestBookModalComponent } from '../request-book-modal/request-book-modal.component';

@Component({
  selector: 'step-card',
  templateUrl: './step-card.component.html',
  styleUrls: ['./step-card.component.less']
})
export class StepCardComponent implements OnInit, OnDestroy {
  @Input() step: any;
  @ViewChild('modal') modal: RequestBookModalComponent;
  userId: string;
  bookSaveSubscription: Subscription;
  userSubscription: Subscription;

  constructor(private readonly dataService: DataService, private authService: AuthService, private readonly toastrService: HotToastService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.pipe(
      map(user => {
        this.userId = user.uid;
      })
    ).subscribe();
  }

  setCurrentActive() {
    if (this.step.value.active && !this.step.next?.value.active || this.step.next === null && this.step.value.active) {
      return true;
    } else {
      return false;
    }
  }

  saveBook(book) {
    this.bookSaveSubscription = this.dataService.addToSaved(this.userId, book).subscribe(() => {
      this.toastrService.success(`Book saved to your favourites!`);
      this.dataService.favouriteAdded();
    }, () => this.toastrService.error('Save unsuccessful'));
  }

  request() {
    this.modal.toggleModal();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    if (this.bookSaveSubscription) {
      this.bookSaveSubscription.unsubscribe();
    }
  }
}
