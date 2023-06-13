import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from './book-card.component';
import { BookDescriptionModalComponent } from 'src/app/user/components/book-description-modal/book-description-modal.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [BookCardComponent, BookDescriptionModalComponent],
  exports: [BookCardComponent]
})
export class BookCardModule { }
