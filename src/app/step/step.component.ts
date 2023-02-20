import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.less']
})
export class StepComponent implements OnInit {
  @Input() steps: any;
  constructor() { }

  ngOnInit() {
  }

}
