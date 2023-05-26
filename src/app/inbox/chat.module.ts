import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrameModule } from '../frame/frame.module';
import { ChatRoutingModule } from './chat.routing.module';
import { InboxComponent } from './inbox.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DateDisplayPipe } from '../shared/pipes/date-display.pipe';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FrameModule,
    MatFormFieldModule,
    MatMenuModule,
    MatInputModule,
    MatToolbarModule,
    MatListModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatIconModule,
  ],
  declarations: [
    InboxComponent,
    DateDisplayPipe
  ],
  providers: [DatePipe]
})
export class ChatModule { }
