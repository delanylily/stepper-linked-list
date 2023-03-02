import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddBookComponent } from './search-book/search-book.component';
import { MainComponent } from './main/main.component';
import { MainProfileComponent } from './main-profile/main-profile.component';

const routes = [
  { path: '', component: MainComponent },
  { path: 'add-book', component: MainProfileComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class AppRoutingModule { }
