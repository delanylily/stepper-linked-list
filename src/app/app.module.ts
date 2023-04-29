import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StepperComponent } from './stepper-container/stepper-container.component';
import { StepComponent } from './step/step.component';
import { HttpClientModule } from '@angular/common/http'
import { StepCardComponent } from './step-card/step-card.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './home/home.component';
import { Auth, AuthModule, getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirestore } from '@angular/fire/firestore';

// import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import { HotToastModule } from '@ngneat/hot-toast';
import { BooksComponent } from './books/books.component';
import { InboxComponent } from './inbox/inbox.component';
import { UserDetailsModule } from './user-details/user-details.module';
import { FrameModule } from './frame/frame.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    StepperComponent,
    HomeComponent,
    StepComponent,
    StepCardComponent,
    BooksComponent,
    InboxComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    FrameModule,
    UserDetailsModule,
    AppRoutingModule,
    AngularFireAuthModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    AngularFireModule.initializeApp(environment.firebase),
    // provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    HotToastModule.forRoot(),
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
