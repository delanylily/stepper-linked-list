import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddBookComponent } from './search-book/search-book.component';
import { MainProfileComponent } from './main-profile/main-profile.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { BooksComponent } from './books/books.component';
import { InboxComponent } from './inbox/inbox.component';

const routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'add-book', component: MainProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'inbox', component: InboxComponent },
  { path: 'books', component: BooksComponent },
  { path: 'user-details', component: UserDetailsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify-password', component: VerifyEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class AppRoutingModule { }
