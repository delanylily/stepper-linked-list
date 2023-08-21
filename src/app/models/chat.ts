import { User } from "./user";

export interface Chat {
  id: string;
  lastMessage?: string;
  lastMessageDate?: Date;
  userIds: string[];
  users: User[];
  chatPic?: string;
  chatName?: string;
}

export interface Message {
  text: string;
  senderId: string;
  sentDate: Date;
}
