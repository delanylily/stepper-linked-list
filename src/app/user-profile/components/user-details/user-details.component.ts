import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HotToastService } from '@ngneat/hot-toast';
import { GenericModalComponent } from 'src/app/auth/components/generic-modal/generic-modal.component';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.less']
})
export class UserDetailsComponent implements OnInit {
  fileData: File = null;
  editingForm: boolean;
  @Input() user: User;
  @ViewChild('modal') modal: GenericModalComponent;
  modalContent: { heading: string, message: string; };
  imageUrl: string;
  userDetails: any;
  userForm: any;

  constructor(private userService: UserService, private toastr: HotToastService, private angularStorage: AngularFireStorage) { }

  ngOnInit() {
    // this.store.select(user).pipe(
    //   filter(user => user !== undefined),
    // ).subscribe()
    this.userDetails = this.user?.userDetails;
    this.editingForm = false;
    this.imageUrl = this.user.profileImg;
  }

  onEdit(): void {
    this.modal.toggleModal();
  }

  onEditSaved(event): void {
    this.fileData = event.fileData;
    this.userForm = event.form;
    this.onSubmit();
  }

  async onSubmit() {
    if (this.fileData !== null) {
      const path = `users/${this.user.uid}/profileImg/${this.fileData.name}`;
      const uploadTask = await this.angularStorage.upload(path, this.fileData);
      const url = await uploadTask.ref.getDownloadURL();
      this.imageUrl = url;
    }
    // this.store.dispatch(updateUser({ userId: this.user.uid, user: this.userForm.value }));
    this.userService.updateUser(this.user.uid, this.userForm.value).subscribe(res => {
      this.toastr.success('Your image has been upload successfully');
      location.reload();
    }, (error) => {
      this.toastr.error(`There has been an error uploading your image: ${error}`);
    });
    this.modal.toggleModal();
  }
}