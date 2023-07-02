import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { combineLatest, map, Subscription } from 'rxjs';
import { GenericModalComponent } from 'src/app/shared/components/generic-modal/generic-modal.component';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'user-collection',
  templateUrl: './user-collection.component.html',
  styleUrls: ['./user-collection.component.less']
})
export class UserCollectionComponent implements OnInit, OnDestroy {
  @Input() userId: string;
  @ViewChild('modal') modal: GenericModalComponent;
  modalContent: { heading: string, message: string; };
  books: Array<any>;
  doc: any;
  itemToDelete: any;
  data$: any;
  bookAvailability: string;
  bookAvailabilitySubscription: Subscription;

  constructor(private readonly dataService: DataService, private readonly toastService: NgToastService) { }

  ngOnInit() {

    this.modalContent = { heading: '', message: '' };
    const books$ = this.dataService.getUserBooks(this.userId);
    const doc$ = this.dataService.getBooksDocument(this.userId);
    this.data$ = combineLatest([books$, doc$]).pipe(
      map(([books, doc]) => {
        this.doc = doc;
        return { books, doc };
      })
    );
  }

  onDeleteBookConfirmation() {
    this.doc.map(doc => {
      if (this.itemToDelete.id === doc.payload.doc.id) {
        this.dataService.deleteUserBook(this.userId, doc.payload.doc.id).then(() => {
          this.toastService.success({ detail: "Delete successful!", duration: 3000 });
        }).catch((error) => {
          this.toastService.error({ detail: error.message, duration: 5000 });
        });
        this.modal.toggleModal();
      }
    });
  }

  selectBookAvailability(event): void {
    this.bookAvailabilitySubscription = this.dataService.updateBookAvailability(this.userId, event.bookId, event.bookAvailability).subscribe(() => {
      this.toastService.success({ detail: "Book availability updated", duration: 3000 });
    }, error => this.toastService.error({ detail: "Book availability update failed", duration: 5000 }));
  }


  onDeleteSelected(element): void {
    this.itemToDelete = element;
    this.modalContent.heading = "Confirm deletion";
    this.modalContent.message = `Are you sure you would like to delete "${element.title}" from your collection?`;
    this.modal.toggleModal();
  }

  ngOnDestroy(): void {
    if (this.bookAvailabilitySubscription) {
      this.bookAvailabilitySubscription.unsubscribe();
    }
  }
}
