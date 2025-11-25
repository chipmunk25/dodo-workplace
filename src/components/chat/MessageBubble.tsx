import { Check, CheckCheck, ChevronDown, Clock, FileText, Play } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Message, MessageStatus } from '../../types/chat';

interface MessageBubbleProps {
  message: Message;
  isLocal: boolean;
  onImageClick?: (imageUrl: string) => void;
}

function StatusIcon({ status }: { status: MessageStatus }) {
  switch (status) {
    case 'pending':
      return <Clock className="w-3 h-3 text-gray-400" />;
    case 'sent':
      return <Check className="w-3 h-3 text-gray-400" />;
    case 'delivered':
      return <CheckCheck className="w-3 h-3 text-gray-400" />;
    case 'read':
      return <CheckCheck className="w-3 h-3 text-blue-400" />;
    default:
      return null;
  }
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function MessageBubble({ message, isLocal, onImageClick }: MessageBubbleProps) {
  const renderReplyPreview = () => {
    if (!message.replyTo) return null;

    return (
      <div
        className={cn(
          'px-3 py-2 mb-1 rounded-lg text-xs border-l-2',
          isLocal
            ? 'bg-blue-700/50 border-blue-300 text-blue-100'
            : 'bg-gray-200 border-gray-400 text-gray-600'
        )}
      >
        <p className="font-medium truncate">
          {message.replyTo.type === 'text'
            ? message.replyTo.content
            : `[${message.replyTo.type.charAt(0).toUpperCase() + message.replyTo.type.slice(1)}]`}
        </p>
      </div>
    );
  };

  const renderContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <button
            type="button"
            className="block max-w-[240px] rounded-lg overflow-hidden cursor-pointer"
            onClick={() => onImageClick?.(message.content)}
            aria-label="View full image"
          >
            <img
              src={message.content}
              alt="Shared"
              className="w-full h-auto object-cover"
            />
          </button>
        );

      case 'video':
        return (
          <div className="relative max-w-[240px] rounded-lg overflow-hidden cursor-pointer">
            {message.thumbnailUrl ? (
              <img
                src={message.thumbnailUrl}
                alt="Video thumbnail"
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="w-60 h-36 bg-gray-800 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Video</span>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                <Play className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" />
              </div>
            </div>
            {message.duration && (
              <span className="absolute bottom-2 right-2 text-xs text-white bg-black/60 px-1.5 py-0.5 rounded">
                {message.duration}
              </span>
            )}
          </div>
        );

      case 'audio':
        return (
          <div className="min-w-[200px]">
            <audio controls className="w-full h-10" preload="metadata">
              <source src={message.content} type="audio/mpeg" />
              <track kind="captions" label="Audio" />
              Your browser does not support the audio element.
            </audio>
            {message.duration && (
              <span className="text-xs opacity-70 mt-1 block">{message.duration}</span>
            )}
          </div>
        );

      case 'document':
        return (
          <div className="flex items-center gap-3 min-w-[200px]">
            <div
              className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center',
                isLocal ? 'bg-blue-500' : 'bg-gray-200'
              )}
            >
              <FileText className={cn('w-5 h-5', isLocal ? 'text-white' : 'text-gray-600')} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate text-sm">{message.fileName || 'Document'}</p>
              {message.fileSize && (
                <p className="text-xs opacity-70">{message.fileSize}</p>
              )}
            </div>
          </div>
        );

      default:
        return <p className="whitespace-pre-wrap break-words">{message.content}</p>;
    }
  };

  return (
    <div
      className={cn(
        'group flex',
        isLocal ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'relative max-w-[70%] px-3 py-2 rounded-2xl',
          isLocal
            ? 'bg-blue-600 text-white rounded-tr-md'
            : 'bg-gray-100 text-gray-900 rounded-tl-md'
        )}
      >
        {renderReplyPreview()}
        {renderContent()}

        <div
          className={cn(
            'flex items-center gap-1 mt-1',
            isLocal ? 'justify-end' : 'justify-start'
          )}
        >
          <span className={cn('text-[10px]', isLocal ? 'text-blue-100' : 'text-gray-500')}>
            {formatTime(message.timestamp)}
          </span>
          {isLocal && <StatusIcon status={message.status} />}
        </div>

        <button
          type="button"
          className={cn(
            'absolute top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full',
            isLocal
              ? 'right-full mr-1 bg-gray-200 text-gray-600 hover:bg-gray-300'
              : 'left-full ml-1 bg-gray-200 text-gray-600 hover:bg-gray-300'
          )}
          aria-label="Message options"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
