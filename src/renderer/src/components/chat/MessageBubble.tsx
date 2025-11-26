import React from 'react';
import { Check, CheckCheck, FileText, Play, ChevronDown } from 'lucide-react';
import { Message, User } from '../../types/chat';
import { cn } from '../../lib/utils';

interface MessageBubbleProps {
  message: Message;
  isLocal: boolean;
}

export function MessageBubble({ message, isLocal }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={cn("group flex w-full mb-4", isLocal ? "justify-end" : "justify-start")}>
      <div className={cn(
        "relative max-w-[70%] rounded-xl px-4 py-2 shadow-sm border",
        isLocal 
          ? "bg-blue-600 text-white rounded-tr-none border-blue-600" 
          : "bg-white text-gray-900 rounded-tl-none border-gray-200"
      )}>
        
        {/* Reply Context */}
        {message.replyTo && (
          <div className={cn(
            "mb-2 rounded border-l-4 px-2 py-1 text-xs bg-opacity-20",
             isLocal ? "bg-black border-white/50 text-white/90" : "bg-gray-100 border-blue-500 text-gray-600"
          )}>
            <span className="font-bold block mb-0.5">Reply to</span>
            <span className="truncate block">{message.replyTo.content || 'Attachment'}</span>
          </div>
        )}

        {/* Attachments */}
        {message.attachments?.map(att => (
          <div key={att.id} className="mb-2 mt-1">
            {att.type === 'image' && (
              <img src={att.url} alt="attachment" className="rounded-lg max-h-60 object-cover cursor-pointer hover:opacity-95" />
            )}
            {att.type === 'video' && (
              <div className="relative cursor-pointer group/video">
                <img src={att.thumbnailUrl} alt="video thumb" className="rounded-lg max-h-60 object-cover brightness-75" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/50 p-3 rounded-full group-hover/video:bg-black/70 transition">
                    <Play className="h-6 w-6 text-white fill-white" />
                  </div>
                </div>
              </div>
            )}
            {att.type === 'document' && (
              <div className={cn("flex items-center gap-3 p-3 rounded-lg", isLocal ? "bg-blue-700" : "bg-gray-100")}>
                <FileText className="h-8 w-8 opacity-80" />
                <div className="flex flex-col overflow-hidden">
                   <span className="truncate font-medium text-sm">{att.name}</span>
                   <span className="text-xs opacity-70">{att.size}</span>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Text Content */}
        {message.content && (
          <p className="whitespace-pre-wrap text-sm leading-relaxed break-words">
            {message.content}
          </p>
        )}

        {/* Metadata (Time & Status) */}
        <div className={cn("flex items-center justify-end gap-1 mt-1", isLocal ? "text-blue-100" : "text-gray-400")}>
          <span className="text-[10px]">{formatTime(message.timestamp)}</span>
          {isLocal && (
            <span>
              {message.status === 'read' ? <CheckCheck className="h-3 w-3 text-blue-200" /> : 
               message.status === 'delivered' ? <CheckCheck className="h-3 w-3 opacity-70" /> : 
               <Check className="h-3 w-3 opacity-70" />}
            </span>
          )}
        </div>

        {/* Context Menu Trigger (Hover) */}
        <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition bg-black/20 hover:bg-black/40 rounded p-0.5 text-white">
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}