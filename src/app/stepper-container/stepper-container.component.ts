import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, Subject } from 'rxjs';
import { DoubleLinkedList } from '../models/linked-list';
import { DummyData } from '../resources/dummy-data';
@Component({
  selector: 'stepper-container',
  templateUrl: './stepper-container.component.html',
  styleUrls: ['./stepper-container.component.less']
})
export class StepperComponent implements OnInit, OnDestroy {
  linkedList: DoubleLinkedList = new DoubleLinkedList();
  steps: any;
  activeStep: number = 1;
  activeStepSubscription: Subscription;
  activeStep$: Subject<number> = new Subject();
  dummyData: Array<any> = DummyData;

  constructor() {
    this.activeStepSubscription = this.activeStep$.pipe(map(step => {
      this.linkedList.getElementByIndex(0).value.active = step >= 1;
      this.linkedList.getElementByIndex(1).value.active = step >= 2;
      this.linkedList.getElementByIndex(2).value.active = step >= 3;
      this.linkedList.getElementByIndex(3).value.active = step >= 4;
      this.steps = this.linkedList.toArray();
    })).subscribe();
  }

  ngOnInit() {
    this.linkedList.push({ text: '1', active: true, data: this.dummyData[0] });
    this.linkedList.push({ text: '2', active: this.activeStep >= 2, data: this.dummyData[1] });
    this.linkedList.push({ text: '3', active: this.activeStep >= 3, data: this.dummyData[2] });
    this.linkedList.push({ text: '4', active: this.activeStep >= 3, data: this.dummyData[3] });
    this.steps = this.linkedList.toArray();
  }

  prev() {
    if (this.activeStep >= 2) {
      this.activeStep--;
      this.activeStep$.next(this.activeStep);
    }
  }

  next() {
    if (this.activeStep <= 3) {
      this.activeStep++;
      this.activeStep$.next(this.activeStep);
    }
  }


  ngOnDestroy(): void {
    this.activeStepSubscription.unsubscribe();
  }
}
