import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StepperComponent } from './stepper-container/stepper-container.component';
import { StepComponent } from './step/step.component';
import { HttpClientModule } from '@angular/common/http'
import { StepCardComponent } from './step-card/step-card.component';
import { AddBookComponent } from './search-book/search-book.component';
import { AppRoutingModule } from './app-routing.module';
import { MainProfileComponent } from './main-profile/main-profile.component';
import { UserBooksComponent } from './user-books/user-books.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirestore } from '@angular/fire/firestore';

// import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import { HotToastModule } from '@ngneat/hot-toast';
import { FrameComponent } from './frame/frame.component';
import { HeaderComponent } from './header/header.component';
import { BooksComponent } from './books/books.component';
import { InboxComponent } from './inbox/inbox.component';
@NgModule({
  declarations: [
    AppComponent,
    StepperComponent,
    HomeComponent,
    StepComponent,
    StepCardComponent,
    AddBookComponent,
    MainProfileComponent,
    UserBooksComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    UserDetailsComponent,
    FrameComponent,
    HeaderComponent,
    BooksComponent,
    InboxComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    HotToastModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
