import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const routes = [
  { path: 'home', loadChildren: () => import('./home/books.module').then(m => m.BooksModule) },
  { path: 'matches', loadChildren: () => import('./matches/matches.module').then(m => m.MatchesModule) },
  { path: 'inbox', loadChildren: () => import('./inbox/chat.module').then(m => m.ChatModule) },
  { path: 'books', loadChildren: () => import('./home/books.module').then(m => m.BooksModule) },
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
