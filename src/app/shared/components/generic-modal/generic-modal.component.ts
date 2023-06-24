import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.less', '../../../../assets/styles/buttons.less']
})
export class GenericModalComponent implements OnInit {
  @Input() viewModel: { heading: string, message: string; };
  @Output() onConfirmed: EventEmitter<null> = new EventEmitter<null>();
  isOpen: boolean = false;
  constructor() { }

  ngOnInit() { }

  onConfirm() {
    this.onConfirmed.emit();
  }

  toggleModal() {
    this.isOpen = !this.isOpen;
  }
}
