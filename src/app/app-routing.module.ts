import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const routes = [
  { path: 'home', loadChildren: () => import('./home/books.module').then(m => m.BooksModule) },
  { path: 'books', loadChildren: () => import('./home/books.module').then(m => m.BooksModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class AppRoutingModule { }
