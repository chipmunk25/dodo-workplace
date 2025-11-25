import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Message } from '../../types/chat';
import { MessageBubble } from './MessageBubble';

interface MessageListProps {
  messages: Message[];
  localUserId: string;
  onImageClick?: (imageUrl: string) => void;
}

function formatDateSeparator(date: Date): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
}

function shouldShowDateSeparator(currentMsg: Message, prevMsg?: Message): boolean {
  if (!prevMsg) return true;
  return currentMsg.timestamp.toDateString() !== prevMsg.timestamp.toDateString();
}

export function MessageList({ messages, localUserId, onImageClick }: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollButton(!isNearBottom);
  };

  return (
    <div className="relative flex-1 overflow-hidden">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto px-4 py-4 space-y-2"
      >
        {messages.map((message, index) => {
          const prevMessage = messages[index - 1];
          const showSeparator = shouldShowDateSeparator(message, prevMessage);

          return (
            <div key={message.id}>
              {showSeparator && (
                <div className="flex justify-center my-4">
                  <span className="px-4 py-1 bg-gray-200 text-gray-600 text-xs rounded-full font-medium">
                    {formatDateSeparator(message.timestamp)}
                  </span>
                </div>
              )}
              <MessageBubble
                message={message}
                isLocal={message.senderId === localUserId}
                onImageClick={onImageClick}
              />
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {showScrollButton && (
        <button
          type="button"
          onClick={scrollToBottom}
          className={cn(
            'absolute bottom-4 right-4 w-10 h-10 rounded-full',
            'bg-white shadow-lg border border-gray-200',
            'flex items-center justify-center',
            'hover:bg-gray-50 transition-colors'
          )}
          aria-label="Scroll to bottom"
        >
          <ArrowDown className="w-5 h-5 text-gray-600" />
        </button>
      )}
    </div>
  );
}
