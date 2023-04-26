import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './components/main/user-details.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { SearchBookComponent } from './components/search-book/search-book.component';
import { UserBooksComponent } from './components/user-books/user-books.component';
import { UserDetailsRoutingModule } from './user-details.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrameModule } from '../frame/frame.module';

@NgModule({
  imports: [
    CommonModule,
    UserDetailsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FrameModule
  ],
  declarations: [
    UserDetailsComponent,
    SearchBookComponent,
    AddBookComponent,
    UserBooksComponent,
  ]
})
export class UserDetailsModule { }
