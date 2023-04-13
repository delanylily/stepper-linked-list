import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AddBookComponent } from "./components/add-book/add-book.component";
import { UserDetailsComponent } from "./components/main/user-details.component";

const routes = [
  {
    path: '',
    component: UserDetailsComponent
  },
  {
    path: 'add-book',
    component: AddBookComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDetailsRoutingModule { }
