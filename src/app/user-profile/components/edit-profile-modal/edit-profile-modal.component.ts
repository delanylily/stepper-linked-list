import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.less']
})
export class EditProfileModalComponent implements OnInit {
  @Output() onConfirmed: EventEmitter<any> = new EventEmitter<any>();
  @Input() userDetails: any;
  isOpen: boolean = false;
  fileData: File = null;
  userForm = new FormGroup({
    profileImg: new FormControl(''),
    displayName: new FormControl(''),
    language: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }

  onConfirm() {
    this.onConfirmed.emit({ form: this.userForm, fileData: this.fileData });
  }

  onFileSelected(event): void {
    this.fileData = <File>event.target.files[0];
  }

  toggleModal() {
    this.isOpen = !this.isOpen;
  }

}
