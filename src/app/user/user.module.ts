import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/main-user/user.component';
import { UserRoutingModule } from './user.routing.module';
import { FrameModule } from '../frame/frame.module';
import { BookCardComponent } from '../shared/components/book-card/book-card.component';
import { BookDescriptionModalComponent } from './components/book-description-modal/book-description-modal.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FrameModule
  ],
  declarations: [
    UserComponent,
    BookCardComponent,
    BookDescriptionModalComponent
  ]
})
export class UserModule { }
