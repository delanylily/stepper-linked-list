import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest, map, Observable, startWith, filter, switchMap, tap, of, Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { Message } from '../models/chat';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ChatsService } from './chats.service.';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.less']
})
export class InboxComponent implements OnInit, OnDestroy {
  user$ = this.authService.user$;
  selectedUser: any;
  @ViewChild('endOfChat')
  endOfChat!: ElementRef;
  myChats$ = this.chatsService.myChats$;

  searchControl = new FormControl('');
  messageControl = new FormControl('');
  chatListControl = new FormControl([]);
  // chatListControl = new FormControl('');
  filteredUsers: any;
  messages$: Observable<Message[]> | undefined;
  usersSubscription: Subscription;
  selectedChat$ = combineLatest([
    this.chatListControl.valueChanges,
    this.myChats$,
  ]).pipe(map(([value, chats]) => chats.find((c) => c.id === value[0])));

  constructor(private readonly userService: UserService, private authService: AuthService, private chatsService: ChatsService) { }

  ngOnInit() {
    this.myChats$.subscribe(chats => {
      console.log(chats, 'chats');
    });
    this.usersSubscription = combineLatest([this.userService.allUsers$, this.user$]).pipe(
      map(([users, user]) => {
        this.filteredUsers = users.filter((u) => u.uid !== user?.uid);
        console.log(this.filteredUsers, 'filter');
      })
    ).subscribe();

    this.messages$ = this.chatListControl.valueChanges.pipe(
      map((value) => value[0]),
      switchMap((chatId) => this.chatsService.getChatMessages$(chatId)),
      tap(() => {
        this.scrollToBottom();
      })
    );
  }

  onUserSelected(selectedUserId: string): void {
    const selectedUser = this.filteredUsers.find(user => user.uid === selectedUserId);
    this.createChat(selectedUser);
  }

  createChat(user: User) {
    this.chatsService
      .isExistingChat(user.uid)
      .pipe(
        switchMap((chatId) => {
          if (!chatId) {
            return this.chatsService.createChat(user);
          } else {
            return of(chatId);
          }
        })
      )
      .subscribe((chatId) => {
        // this.chatListControl.setValue(chatId);
        this.chatListControl.setValue([chatId]);
      });
  }

  sendMessage() {
    const message = this.messageControl.value;
    const selectedChatId = this.chatListControl.value[0];
    if (message && selectedChatId) {
      this.chatsService
        .addChatMessage(selectedChatId, message)
        .subscribe(() => {
          this.scrollToBottom();
        });
      this.messageControl.setValue('');
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.endOfChat) {
        this.endOfChat.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }
}

