import { useRef, useState, type KeyboardEvent, type ChangeEvent } from 'react';
import {
  FileText,
  Image,
  Mic,
  Music,
  Plus,
  Send,
  Smile,
  Video,
  X,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Message } from '../../types/chat';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  replyingTo?: Message;
  onCancelReply?: () => void;
}

const ATTACHMENT_OPTIONS = [
  { icon: Image, label: 'Image', accept: 'image/*' },
  { icon: Video, label: 'Video', accept: 'video/*' },
  { icon: FileText, label: 'Document', accept: '.pdf,.doc,.docx,.txt' },
  { icon: Music, label: 'Audio', accept: 'audio/*' },
];

export function MessageInput({
  onSendMessage,
  replyingTo,
  onCancelReply,
}: MessageInputProps) {
  const [text, setText] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 96); // max 4 lines (~96px)
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  const handleSend = () => {
    const trimmed = text.trim();
    if (trimmed) {
      onSendMessage(trimmed);
      setText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAttachmentClick = (accept: string) => {
    setShowAttachMenu(false);
    // Create a hidden file input and trigger it
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.click();
    // In a real implementation, you would handle the file upload here
  };

  const hasText = text.trim().length > 0;

  return (
    <div className="border-t border-gray-200 bg-white">
      {/* Reply Preview */}
      {replyingTo && (
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-100">
          <div className="flex-1 border-l-2 border-blue-500 pl-3">
            <p className="text-xs text-blue-600 font-medium">Replying to</p>
            <p className="text-sm text-gray-600 truncate">
              {replyingTo.type === 'text'
                ? replyingTo.content
                : `[${replyingTo.type.charAt(0).toUpperCase() + replyingTo.type.slice(1)}]`}
            </p>
          </div>
          <button
            type="button"
            onClick={onCancelReply}
            className="p-1 hover:bg-gray-200 rounded"
            aria-label="Cancel reply"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-end gap-2 p-3">
        {/* Emoji Button */}
        <button
          type="button"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
          aria-label="Open emoji picker"
        >
          <Smile className="w-5 h-5 text-gray-500" />
        </button>

        {/* Attachment Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowAttachMenu(!showAttachMenu)}
            className={cn(
              'p-2 rounded-full transition-colors flex-shrink-0',
              showAttachMenu ? 'bg-gray-100' : 'hover:bg-gray-100'
            )}
            aria-label="Add attachment"
          >
            <Plus
              className={cn(
                'w-5 h-5 text-gray-500 transition-transform',
                showAttachMenu && 'rotate-45'
              )}
            />
          </button>

          {/* Attachment Menu */}
          {showAttachMenu && (
            <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[160px]">
              {ATTACHMENT_OPTIONS.map(({ icon: Icon, label, accept }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleAttachmentClick(accept)}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className={cn(
              'w-full resize-none rounded-2xl border border-gray-200 px-4 py-2',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
              'placeholder:text-gray-400 text-gray-900',
              'min-h-[40px] max-h-[96px]'
            )}
          />
        </div>

        {/* Send/Mic Button */}
        {hasText ? (
          <button
            type="button"
            onClick={handleSend}
            className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors flex-shrink-0"
            aria-label="Send message"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        ) : (
          <button
            type="button"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Record voice message"
          >
            <Mic className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>
    </div>
  );
}
