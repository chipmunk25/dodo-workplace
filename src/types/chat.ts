export type MessageStatus = 'pending' | 'sent' | 'delivered' | 'read';

export type MessageType = 'text' | 'image' | 'video' | 'audio' | 'document';

export type UserStatus = 'online' | 'offline' | 'away';

export interface User {
  id: string;
  name: string;
  avatar?: string;
  status: UserStatus;
  lastSeen?: string;
}

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  senderId: string;
  timestamp: Date;
  status: MessageStatus;
  replyTo?: Message;
  fileName?: string;
  fileSize?: string;
  duration?: string;
  thumbnailUrl?: string;
}

export interface ChatState {
  messages: Message[];
  selectedUser: User | null;
  isTyping: boolean;
  pinnedMessage?: Message;
  replyingTo?: Message;
  isSearchOpen: boolean;
  searchQuery: string;
}
