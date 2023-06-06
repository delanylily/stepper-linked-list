import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription, take } from 'rxjs';
import { Book } from 'src/app/models/book';
import { DataService } from 'src/app/shared/data.service';
import { BookMatchDetails } from '../../models/matchDetails';

@Component({
  selector: 'request-book-modal',
  templateUrl: './request-book-modal.component.html',
  styleUrls: ['./request-book-modal.component.less', '../../../../assets/styles/buttons.less']
})
export class RequestBookModalComponent implements OnInit, OnDestroy {
  @Input() viewModel: any;
  @Output() onConfirmed: EventEmitter<null> = new EventEmitter<null>();
  isOpen: boolean = false;
  userFavouritesSubscription: Subscription;
  userBookSubscription: Subscription;
  availabilityText: string;
  requestedBook: Book;
  matchDetails: any;

  constructor(private readonly dataService: DataService, private router: Router) { }

  ngOnInit() {
    switch (this.viewModel.book.availability) {
      case 'both':
        this.availabilityText = 'borrow and swap';
        break;
      case 'lend':
        this.availabilityText = 'borrow';
        break;
      case 'swap':
        this.availabilityText = 'swap';
        break;
    }
  }

  onConfirm() {
    this.requestedBook = this.viewModel.book;
    const reqBookOwnerId = this.viewModel.book.userId;
    this.dataService.addToRequested(this.viewModel.user, this.viewModel.book).subscribe();
    this.getUserRequests(reqBookOwnerId);
  }

  getUserRequests(reqBookOwnerId) {
    this.dataService.getUserRequests(reqBookOwnerId).pipe(
      map(requests => {
        const match = requests.filter((match: any) => match.userId === this.viewModel.user);
        if (match.length) {
          this.addToMatches(match[0]);
        }
      })
    ).subscribe();
  }

  addToMatches(book) {
    this.matchDetails = { matchBook: this.requestedBook, userBook: book };
    this.dataService.addToMatches(this.viewModel.user, this.matchDetails).subscribe();
    this.dataService.addToMatches(this.requestedBook.userId, this.matchDetails).subscribe();
  }

  messageOwner() {
    this.router.navigate(['/inbox']);
  }

  viewCollection() {
    this.router.navigate(['/user', this.matchDetails.requestedBook.userId]);
  }

  toggleModal() {
    this.isOpen = !this.isOpen;
  }

  ngOnDestroy(): void {
    if (this.userBookSubscription) {
      this.userBookSubscription.unsubscribe();
    }
    if (this.userFavouritesSubscription) {
      this.userFavouritesSubscription.unsubscribe();
    }
  }
}
