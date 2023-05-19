import { NgModule } from '@angular/core';
import { UserComponent } from './components/main-user/user.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: UserComponent
  }
  // { component: UserComponent, path: 'user/:userId' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
