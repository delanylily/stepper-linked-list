import { NgModule } from '@angular/core';
import { BooksComponent } from './components/main/books.component';
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
