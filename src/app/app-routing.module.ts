import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddBookComponent } from './search-book/search-book.component';
import { MainComponent } from './main/main.component';
import { MainProfileComponent } from './main-profile/main-profile.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';

const routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add-book', component: MainProfileComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class AppRoutingModule { }
