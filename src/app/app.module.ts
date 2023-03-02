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
@NgModule({
  declarations: [
    AppComponent,
    StepperComponent,
    StepComponent,
    StepCardComponent,
    MainComponent,
    AddBookComponent,
    MainProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
