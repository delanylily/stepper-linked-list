import { Component, OnInit } from '@angular/core';
import { DoubleLinkedList } from '../models/linked-list';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.less']
})
export class StepperComponent implements OnInit {
  linkedList: DoubleLinkedList = new DoubleLinkedList();
  constructor() { }

  ngOnInit() {
    this.linkedList.push({ text: '1' });
    this.linkedList.push({ text: '2' });
    this.linkedList.push({ text: '3' });
    this.linkedList.push({ text: '4' });
  }

}
