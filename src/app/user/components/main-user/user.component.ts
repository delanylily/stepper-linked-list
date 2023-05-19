import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { DataService } from 'src/app/shared/data.service';
import { BookDescriptionModalComponent } from '../book-description-modal/book-description-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  userId: string;
  user: User;
  data$: Observable<any>;
  bookSummaryDetails: any;
  @ViewChild('modal') bookDescriptionModal: BookDescriptionModalComponent;
  constructor(private activatedRoute: ActivatedRoute, private readonly userService: UserService, private readonly dataService: DataService) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params['userId'];
    const user$ = this.userService.getUser(this.userId);
    const books$ = this.dataService.getUserBooks(this.userId);
    const doc$ = this.dataService.getBooksDocument(this.userId);
    this.data$ = combineLatest([user$, books$, doc$]).pipe(
      map(([user, books, doc]) => {
        return { user, books, doc };
      })
    );
  }

  onViewSummary(event) {
    this.bookSummaryDetails = event;
    this.bookDescriptionModal.toggleModal();
  }

  request() {

  }

  saveBook() {

  }

}
