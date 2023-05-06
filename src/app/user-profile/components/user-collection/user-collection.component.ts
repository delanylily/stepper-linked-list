import { Component, ComponentRef, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { GenericModalComponent } from 'src/app/auth/components/generic-modal/generic-modal.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Book } from 'src/app/models/book';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'user-collection',
  templateUrl: './user-collection.component.html',
  styleUrls: ['./user-collection.component.less']
})
export class UserCollectionComponent implements OnInit {
  @Input() userId: string;
  @ViewChild('modal') modal: GenericModalComponent;
  modalContent: { heading: string, message: string; };
  books: Array<any>;
  doc: any;
  itemToDelete: any;

  constructor(private readonly dataService: DataService, private readonly toastr: HotToastService) { }

  ngOnInit() {
    this.modalContent = { heading: '', message: '' };
    this.dataService.getBooksDocument(this.userId).subscribe(doc => {
      this.doc = doc;
    });
    this.dataService.getUserBooks(this.userId).subscribe(res => {
      this.books = res;
    });
  }

  onDeleteBookConfirmation() {
    this.doc.map(doc => {
      if (this.itemToDelete.id === doc.payload.doc.id) {
        this.dataService.deleteUserBook(this.userId, doc.payload.doc.id).then(() => {
          this.toastr.success('Delete successful!');
        }).catch((error) => {
          this.toastr.error(`an error occured: ${error}`);
        });
        this.modal.toggleModal();
      }
    });
  }


  onDeleteSelected(element) {
    this.itemToDelete = element;
    this.modalContent.heading = "Confirm deletion";
    this.modalContent.message = `Are you sure you would like to delete "${element.title}" from your collection?`;
    this.modal.toggleModal();
  }
}
