import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatchesComponent } from './matches/matches.component';

const routes = [
  { path: 'home', loadChildren: () => import('./books/books.module').then(m => m.BooksModule) },
  { path: 'matches', component: MatchesComponent },
  { path: 'inbox', loadChildren: () => import('./inbox/chat.module').then(m => m.ChatModule) },
  { path: 'books', loadChildren: () => import('./books/books.module').then(m => m.BooksModule) },
  { path: 'user-profile', loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'user/:userId', loadChildren: () => import('./user/user.module').then(m => m.UserModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class AppRoutingModule { }
