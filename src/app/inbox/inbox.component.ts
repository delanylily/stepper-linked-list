import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.less']
})
export class InboxComponent implements OnInit {
  searchControl = new FormControl('');
  constructor() { }

  ngOnInit() {
  }

}
