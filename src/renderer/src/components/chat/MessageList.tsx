import React, { useEffect, useRef } from 'react';
import { Message } from '../../types/chat';
import { MessageBubble } from './MessageBubble';
import { ArrowDown } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

export function MessageList({ messages, currentUserId }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-[#f0f2f5] relative">
      {/* Date Separator Example */}
      <div className="flex justify-center mb-6">
        <span className="bg-gray-200 text-gray-600 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
          Today
        </span>
      </div>

      {messages.map((msg) => (
        <MessageBubble 
          key={msg.id} 
          message={msg} 
          isLocal={msg.senderId === currentUserId} 
        />
      ))}
      
      <div ref={bottomRef} />

      {/* Floating Scroll Button (Optional logic to show/hide needed) */}
      {/* <button className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md text-gray-600 hover:bg-gray-50">
        <ArrowDown className="h-5 w-5" />
      </button> */}
    </div>
  );
}