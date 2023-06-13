import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { DataService } from 'src/app/shared/data.service';
import { BookDescriptionModalComponent } from '../book-description-modal/book-description-modal.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less', '../../../../assets/styles/buttons.less']
})
export class UserComponent implements OnInit {
  profileUserId: string;
  userId: string;
  user: User;
  data$: Observable<any>;
  bookSummaryDetails: any;
  userSubscription: Subscription;
  showRequest: boolean;
  requests: any;
  @ViewChild('modal') bookDescriptionModal: BookDescriptionModalComponent;

  constructor(private readonly authService: AuthService, private location: Location, private activatedRoute: ActivatedRoute, private readonly userService: UserService, private readonly dataService: DataService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.userId = user.uid;
      this.profileUserId = this.activatedRoute.snapshot.params['userId'];
      const user$ = this.userService.getUser(this.profileUserId);
      const books$ = this.dataService.getUserBooks(this.profileUserId);
      const doc$ = this.dataService.getBooksDocument(this.profileUserId);
      const requests$ = this.dataService.getUserRequests(this.userId);

      this.data$ = combineLatest([user$, books$, doc$, requests$]).pipe(
        map(([user, books, doc, requests]) => {
          console.log(books, 'books');
          console.log(requests, 'requests');
          this.requests = requests;
          return { user, books, doc, requests };
        })
      );
    });

  }

  shouldShowRequest(bookId: string): boolean {
    const requestsIds = this.requests.map(request => request.id);
    return !requestsIds.includes(bookId);
  }

  goBack(): void {
    this.location.back();
  }

  onViewSummary(event): void {
    this.bookSummaryDetails = event;
    this.bookDescriptionModal.toggleModal();
  }

  onBookRequested(book: Book) {
    console.log(book);
  }

  request() {

  }

  saveBook() {

  }

}
