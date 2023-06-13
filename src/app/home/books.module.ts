import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './components/main/books.component';
import { RequestBookModalComponent } from './components/request-book-modal/request-book-modal.component';
import { StepCardComponent } from './components/step-card/step-card.component';
import { StepperComponent } from './components/stepper-container/stepper-container.component';
import { StepComponent } from './components/step/step.component';
import { BooksRoutingModule } from './books.routing.module';
import { FrameModule } from '../frame/frame.module';
import { RequestBookModule } from './components/request-book-modal/request-book.module';

@NgModule({
  imports: [
    CommonModule,
    BooksRoutingModule,
    FrameModule,
    RequestBookModule
  ],
  declarations: [
    BooksComponent,
    StepComponent,
    StepCardComponent,
    StepperComponent,
  ]
})
export class BooksModule { }
