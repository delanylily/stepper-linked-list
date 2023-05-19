import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
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
    this.userFavouritesSubscription = this.dataService.getUserFavourites(reqBookOwnerId).pipe(
      map(favourites => {
        const match = favourites.filter((fav: any) => fav.bookOwnerId === this.viewModel.user);
        if (match.length) {
          this.getBookMatchDetails(match[0]);
        }
      })
    ).subscribe();
  }

  getBookMatchDetails(match) {
    this.userBookSubscription = this.dataService.getUserBook(match.bookOwnerId, match.bookId).subscribe(book => {
      const requestedBook = new BookMatchDetails(this.requestedBook);
      const userBook = new BookMatchDetails(book);
      this.matchDetails = { requestedBook, userBook };
    });
  }

  messageOwner() {
    this.router.navigate(['/inbox']);
  }

  viewCollection() {
    console.log(this.matchDetails.requestedBook, 'req');
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
