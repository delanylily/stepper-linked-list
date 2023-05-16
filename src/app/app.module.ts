import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './home/home.component';
import { Auth, AuthModule, getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

// import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import { HotToastModule } from '@ngneat/hot-toast';
import { InboxComponent } from './inbox/inbox.component';
import { FrameModule } from './frame/frame.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserProfileModule } from './user-profile/user-profile.module';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InboxComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    FrameModule,
    UserProfileModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
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
