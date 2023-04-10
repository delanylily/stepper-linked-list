import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'frame',
  template: `
 <div class="wrapper">
  <header></header>
  <div class="content-wrapper">
<section class="content-header">
  <ng-content select="[title]"></ng-content>
</section>
<section class="content">
  <ng-content select="[body]"></ng-content>
</section>
  </div>
 <div class="footer">footer</div>
 </div>
  `
})
export class FrameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}