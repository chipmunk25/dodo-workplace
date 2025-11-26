import React, { useState } from 'react';
import { Phone, Search, MoreVertical, ChevronDown, X, ArrowUp, ArrowDown } from 'lucide-react';
import { User, Message } from '../../types/chat';
import { cn } from '../../lib/utils';

interface ChatHeaderProps {
  user: User;
  pinnedMessage?: Message;
}

export function ChatHeader({ user, pinnedMessage }: ChatHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex flex-col border-b border-gray-200 bg-white">
      {/* Main Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
              alt={user.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            {user.status === 'online' && (
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{user.name}</h3>
            <p className="text-xs text-gray-500">
              {user.status === 'typing' ? (
                <span className="text-green-600 font-medium">Typing...</span>
              ) : (
                user.lastSeen || 'Online'
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
            <Phone className="h-5 w-5" />
          </button>
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={cn("p-2 rounded-full transition", isSearchOpen ? "bg-gray-100 text-blue-600" : "text-gray-500 hover:bg-gray-100")}
          >
            <Search className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Search Bar (Overlay) */}
      {isSearchOpen && (
        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 border-t border-gray-100">
          <input 
            type="text" 
            placeholder="Search in conversation..." 
            className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-1 text-sm focus:outline-none focus:border-blue-500"
            autoFocus
          />
          <span className="text-xs text-gray-400 whitespace-nowrap">0 of 0</span>
          <button className="p-1 hover:bg-gray-200 rounded"><ArrowUp className="h-4 w-4 text-gray-500"/></button>
          <button className="p-1 hover:bg-gray-200 rounded"><ArrowDown className="h-4 w-4 text-gray-500"/></button>
          <button onClick={() => setIsSearchOpen(false)} className="ml-2 text-sm font-medium text-blue-600 hover:underline">Done</button>
        </div>
      )}

      {/* Pinned Message Bar */}
      {pinnedMessage && !isSearchOpen && (
        <div className="flex items-center justify-between bg-gray-50 px-4 py-2 text-sm border-t border-gray-100 cursor-pointer hover:bg-gray-100">
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs font-semibold text-blue-600">Pinned Message</span>
            <span className="truncate text-gray-600">{pinnedMessage.content || 'Attachment'}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      )}
    </div>
  );
}