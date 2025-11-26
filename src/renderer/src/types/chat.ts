// export type MessageStatus = "pending" | "sent" | "delivered" | "read";

// export type MessageType = "text" | "image" | "video" | "audio" | "document";

// export type UserStatus = "online" | "offline" | "typing" | "last-seen";

// export interface ChatState {
//   messages: Message[];
//   selectedUser: User | null;
//   isTyping: boolean;
//   pinnedMessage?: Message;
//   replyingTo?: Message;
//   isSearchOpen: boolean;
//   searchQuery: string;
// }

// export type User = {
//   id: string;
//   name: string;
//   avatar?: string;
//   status: UserStatus;
//   lastSeen?: string;
// };

// export type AttachmentType = "image" | "video" | "audio" | "document";

// export type Attachment = {
//   id: string;
//   type: AttachmentType;
//   url: string;
//   name?: string;
//   size?: string;
//   thumbnailUrl?: string; // For videos
// };

// export type Message = {
//   id: string;
//   senderId: string;
//   content?: string;
//   timestamp: Date;
//   status: MessageStatus;
//   attachments?: Attachment[];
//   replyTo?: Message;
//   isPinned?: boolean;
//   fileName?: string;
//   fileSize?: string;
//   duration?: string;
//   thumbnailUrl?: string;
//   type: MessageType;
// };

export type User = {
  id: string
  name: string
  avatar?: string
  status: 'online' | 'offline' | 'typing' | 'last-seen'
  lastSeen?: string
}

export type MessageStatus = 'pending' | 'sent' | 'delivered' | 'read'

export type AttachmentType = 'image' | 'video' | 'audio' | 'document'

export type Attachment = {
  id: string
  type: AttachmentType
  url: string
  name?: string
  size?: string
  thumbnailUrl?: string // For videos
}

export type Message = {
  id: string
  senderId: string
  content?: string
  timestamp: Date
  status: MessageStatus
  attachments?: Attachment[]
  replyTo?: Message
  isPinned?: boolean
}
