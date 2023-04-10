import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'step-card',
  templateUrl: './step-card.component.html',
  styleUrls: ['./step-card.component.less']
})
export class StepCardComponent implements OnInit {
  @Input() step: any;
  constructor() { }

  ngOnInit() {
    console.log(this.step, 'step')
  }

  setCurrentActive() {
    if (this.step.value.active && !this.step.next?.value.active || this.step.next === null && this.step.value.active) {
      return true;
    } else {
      return false;
    }
  }
}
