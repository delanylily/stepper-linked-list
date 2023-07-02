import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { DataService } from '../../../shared/data.service';
import { RequestBookModalComponent } from '../request-book-modal/request-book-modal.component';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'step-card',
  templateUrl: './step-card.component.html',
  styleUrls: ['./step-card.component.less', '../../../../assets/styles/buttons.less']
})
export class StepCardComponent implements OnInit, OnDestroy {
  @Input() step: any;
  @ViewChild('modal') modal: RequestBookModalComponent;
  userId: string;
  userSubscription: Subscription;

  constructor(private readonly dataService: DataService, private readonly authService: AuthService, private readonly toastService: NgToastService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  setCurrentActive() {
    if (this.step.value.active && !this.step.next?.value.active || this.step.next === null && this.step.value.active) {
      return true;
    } else {
      return false;
    }
  }

  saveBook(book) {
    this.dataService.addToSaved(this.userId, book).then(() => {
      this.toastService.success({ detail: "Book saved to your favourites!", duration: 3000 });
      this.dataService.favouriteAdded();
    }, err => this.toastService.error({ detail: err.message, summary: "An error occurred", duration: 5000 }));
  }

  request() {
    this.modal.toggleModal();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
