import { useState } from 'react';
import type { Message, User } from '../../types/chat';
import { ChatHeader } from './ChatHeader';
import { ImageModal } from './ImageModal';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';

// Mock user data
const mockUser: User = {
  id: 'user-2',
  name: 'Sarah Johnson',
  status: 'online',
  lastSeen: 'today at 2:30 PM',
};

const localUserId = 'user-1';

// Create dates for mock messages
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

// Mock messages demonstrating all types and features
const initialMessages: Message[] = [
  {
    id: 'msg-1',
    content: 'Hey! How are you doing?',
    type: 'text',
    senderId: 'user-2',
    timestamp: new Date(yesterday.setHours(10, 30)),
    status: 'read',
  },
  {
    id: 'msg-2',
    content: "I'm doing great, thanks for asking! Working on the new project.",
    type: 'text',
    senderId: 'user-1',
    timestamp: new Date(yesterday.setHours(10, 32)),
    status: 'read',
  },
  {
    id: 'msg-3',
    content: 'That sounds exciting! Can you share some details?',
    type: 'text',
    senderId: 'user-2',
    timestamp: new Date(yesterday.setHours(10, 35)),
    status: 'read',
  },
  {
    id: 'msg-4',
    content: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800',
    type: 'image',
    senderId: 'user-1',
    timestamp: new Date(yesterday.setHours(10, 40)),
    status: 'read',
  },
  {
    id: 'msg-5',
    content: "Here's the design mockup we discussed",
    type: 'text',
    senderId: 'user-1',
    timestamp: new Date(yesterday.setHours(10, 41)),
    status: 'read',
  },
  {
    id: 'msg-6',
    content: 'Wow, this looks amazing! Great work 🎉',
    type: 'text',
    senderId: 'user-2',
    timestamp: new Date(yesterday.setHours(11, 0)),
    status: 'read',
  },
  {
    id: 'msg-7',
    content: '/videos/demo.mp4',
    type: 'video',
    senderId: 'user-2',
    timestamp: new Date(today.setHours(9, 15)),
    status: 'read',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400',
    duration: '2:34',
  },
  {
    id: 'msg-8',
    content: 'Check out this video walkthrough of the new features',
    type: 'text',
    senderId: 'user-2',
    timestamp: new Date(today.setHours(9, 16)),
    status: 'read',
  },
  {
    id: 'msg-9',
    content: '/audio/voice-note.mp3',
    type: 'audio',
    senderId: 'user-1',
    timestamp: new Date(today.setHours(10, 0)),
    status: 'delivered',
    duration: '0:42',
  },
  {
    id: 'msg-10',
    content: '/documents/project-specs.pdf',
    type: 'document',
    senderId: 'user-2',
    timestamp: new Date(today.setHours(10, 30)),
    status: 'read',
    fileName: 'Project-Specifications.pdf',
    fileSize: '2.4 MB',
  },
  {
    id: 'msg-11',
    content: "Thanks! I'll review this right away.",
    type: 'text',
    senderId: 'user-1',
    timestamp: new Date(today.setHours(10, 32)),
    status: 'delivered',
    replyTo: {
      id: 'msg-10',
      content: '/documents/project-specs.pdf',
      type: 'document',
      senderId: 'user-2',
      timestamp: new Date(today.setHours(10, 30)),
      status: 'read',
      fileName: 'Project-Specifications.pdf',
      fileSize: '2.4 MB',
    },
  },
  {
    id: 'msg-12',
    content: 'Let me know if you have any questions about the implementation details.',
    type: 'text',
    senderId: 'user-2',
    timestamp: new Date(today.setHours(10, 35)),
    status: 'read',
  },
  {
    id: 'msg-13',
    content: 'Will do! The architecture section looks solid.',
    type: 'text',
    senderId: 'user-1',
    timestamp: new Date(today.setHours(10, 40)),
    status: 'sent',
  },
  {
    id: 'msg-14',
    content: 'Just sent the updated version...',
    type: 'text',
    senderId: 'user-1',
    timestamp: new Date(),
    status: 'pending',
  },
];

// Pinned message for demonstration
const pinnedMessage: Message = {
  id: 'pinned-1',
  content: 'Meeting scheduled for tomorrow at 3 PM. Please be prepared!',
  type: 'text',
  senderId: 'user-2',
  timestamp: new Date(yesterday.setHours(14, 0)),
  status: 'read',
};

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Message | undefined>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [imageModalUrl, setImageModalUrl] = useState<string | null>(null);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      type: 'text',
      senderId: localUserId,
      timestamp: new Date(),
      status: 'pending',
      replyTo: replyingTo,
    };

    setMessages((prev) => [...prev, newMessage]);
    setReplyingTo(undefined);

    // Simulate message status updates
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
        )
      );
    }, 500);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        )
      );
    }, 1500);

    // Simulate typing indicator after sending
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 3000);
    }, 2000);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery('');
    }
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleImageClick = (imageUrl: string) => {
    setImageModalUrl(imageUrl);
  };

  const handleCloseImageModal = () => {
    setImageModalUrl(null);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <ChatHeader
        user={mockUser}
        isTyping={isTyping}
        pinnedMessage={pinnedMessage}
        isSearchOpen={isSearchOpen}
        searchQuery={searchQuery}
        onSearchToggle={handleSearchToggle}
        onSearchChange={setSearchQuery}
        onSearchClose={handleSearchClose}
        matchCount={searchQuery ? 3 : 0}
        currentMatch={searchQuery ? 1 : 0}
      />

      <MessageList
        messages={messages}
        localUserId={localUserId}
        onImageClick={handleImageClick}
      />

      <MessageInput
        onSendMessage={handleSendMessage}
        replyingTo={replyingTo}
        onCancelReply={() => setReplyingTo(undefined)}
      />

      {imageModalUrl && (
        <ImageModal imageUrl={imageModalUrl} onClose={handleCloseImageModal} />
      )}
    </div>
  );
}
