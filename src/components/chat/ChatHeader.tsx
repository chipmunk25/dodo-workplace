import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Phone,
  Pin,
  Search,
  X,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Message, User } from '../../types/chat';

interface ChatHeaderProps {
  user: User;
  isTyping: boolean;
  pinnedMessage?: Message;
  onSearchToggle?: () => void;
  isSearchOpen?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  matchCount?: number;
  currentMatch?: number;
  onNextMatch?: () => void;
  onPrevMatch?: () => void;
  onSearchClose?: () => void;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getStatusText(user: User, isTyping: boolean): string {
  if (isTyping) return 'typing...';
  if (user.status === 'online') return 'Online';
  if (user.lastSeen) return `Last seen ${user.lastSeen}`;
  return 'Offline';
}

export function ChatHeader({
  user,
  isTyping,
  pinnedMessage,
  onSearchToggle,
  isSearchOpen,
  searchQuery,
  onSearchChange,
  matchCount = 0,
  currentMatch = 0,
  onNextMatch,
  onPrevMatch,
  onSearchClose,
}: ChatHeaderProps) {
  const [showPinnedPreview, setShowPinnedPreview] = useState(true);

  return (
    <div className="border-b border-gray-200 bg-white">
      {/* Main Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
              {getInitials(user.name)}
            </div>
          )}

          {/* Name and Status */}
          <div>
            <h2 className="font-semibold text-gray-900">{user.name}</h2>
            <p
              className={cn(
                'text-xs',
                isTyping ? 'text-green-600' : 'text-gray-500'
              )}
            >
              {getStatusText(user, isTyping)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Call"
          >
            <Phone className="w-5 h-5 text-gray-600" />
          </button>
          <button
            type="button"
            onClick={onSearchToggle}
            className={cn(
              'p-2 rounded-full transition-colors',
              isSearchOpen ? 'bg-gray-100' : 'hover:bg-gray-100'
            )}
            aria-label="Search messages"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          <button
            type="button"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="More options"
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="flex items-center gap-2 px-4 py-2 border-t border-gray-100 bg-gray-50">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
            autoFocus
          />
          {searchQuery && matchCount > 0 && (
            <span className="text-xs text-gray-500">
              {currentMatch}/{matchCount}
            </span>
          )}
          <div className="flex items-center">
            <button
              type="button"
              onClick={onPrevMatch}
              disabled={matchCount === 0}
              className="p-1 hover:bg-gray-200 rounded disabled:opacity-50"
              aria-label="Previous match"
            >
              <ChevronUp className="w-4 h-4 text-gray-600" />
            </button>
            <button
              type="button"
              onClick={onNextMatch}
              disabled={matchCount === 0}
              className="p-1 hover:bg-gray-200 rounded disabled:opacity-50"
              aria-label="Next match"
            >
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <button
            type="button"
            onClick={onSearchClose}
            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
          >
            Done
          </button>
        </div>
      )}

      {/* Pinned Message */}
      {pinnedMessage && showPinnedPreview && (
        <div className="flex items-center gap-2 px-4 py-2 border-t border-gray-100 bg-amber-50">
          <Pin className="w-4 h-4 text-amber-600 rotate-45" />
          <p className="flex-1 text-sm text-gray-700 truncate">
            {pinnedMessage.type === 'text'
              ? pinnedMessage.content
              : `[${pinnedMessage.type.charAt(0).toUpperCase() + pinnedMessage.type.slice(1)}]`}
          </p>
          <button
            type="button"
            onClick={() => setShowPinnedPreview(false)}
            className="p-1 hover:bg-amber-100 rounded"
            aria-label="Dismiss pinned message"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      )}
    </div>
  );
}
