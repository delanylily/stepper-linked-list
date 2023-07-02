import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from './components/add-book/add-book.component';
import { SearchBookComponent } from './components/search-book/search-book.component';
import { UserBooksComponent } from './components/user-books/user-books.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrameModule } from '../frame/frame.module';
import { UserCollectionComponent } from './components/user-collection/user-collection.component';
import { UserMainComponent } from './components/main/user-main.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserProfileRoutingModule } from './user-profile.routing.module';
import { EditProfileModalComponent } from './components/edit-profile-modal/edit-profile-modal.component';
import { BookCardModule } from '../shared/components/book-card/book-card.module';
import { GenericModalModule } from '../shared/components/generic-modal/generic-modal.module';


@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    ReactiveFormsModule,
    BookCardModule,
    FormsModule,
    FrameModule,
    GenericModalModule
    // StoreModule.forFeature(userFeatureKey, userReducer),
    // EffectsModule.forFeature(UserEffects)
  ],
  declarations: [
    UserMainComponent,
    SearchBookComponent,
    UserDetailsComponent,
    AddBookComponent,
    UserBooksComponent,
    UserCollectionComponent,
    EditProfileModalComponent
  ]
})
export class UserProfileModule { }
