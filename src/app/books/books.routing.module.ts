import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './components/main/books.component';
import { RequestBookModalComponent } from './components/request-book-modal/request-book-modal.component';
import { StepCardComponent } from './components/step-card/step-card.component';
import { StepperComponent } from './components/stepper-container/stepper-container.component';
import { StepComponent } from './components/step/step.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: BooksComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],

})
export class BooksRoutingModule { }
