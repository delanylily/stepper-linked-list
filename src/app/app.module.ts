import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StepperComponent } from './stepper-container/stepper-container.component';
import { StepComponent } from './step/step.component';
import { HttpClientModule } from '@angular/common/http'
import { StepCardComponent } from './step-card/step-card.component';
import { MainComponent } from './main/main.component';
import { AddBookComponent } from './search-book/search-book.component';
import { AppRoutingModule } from './app-routing.module';
import { MainProfileComponent } from './main-profile/main-profile.component';
import { UserBooksComponent } from './user-books/user-books.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    StepperComponent,
    StepComponent,
    StepCardComponent,
    MainComponent,
    AddBookComponent,
    MainProfileComponent,
    UserBooksComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
