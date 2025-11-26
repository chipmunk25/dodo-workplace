import React, { useState, useRef } from 'react';
import { Smile, Plus, Mic, Send, Image as ImageIcon, File, Video, Music } from 'lucide-react';

export function MessageInput() {
  const [text, setText] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    // Auto-grow logic
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="bg-white px-4 py-3 border-t border-gray-200">
      <div className="flex items-end gap-3 relative">
        
        {/* Left Actions */}
        <div className="flex items-center gap-2 mb-2">
          <button className="text-gray-500 hover:text-gray-700 transition">
            <Smile className="h-6 w-6" />
          </button>
          <button 
            onClick={() => setShowAttachMenu(!showAttachMenu)}
            className="text-gray-500 hover:text-gray-700 transition bg-gray-100 p-1.5 rounded-full"
          >
            <Plus className={showAttachMenu ? "rotate-45 transition duration-200" : "transition duration-200"} />
          </button>
        </div>

        {/* Attachment Drop-up */}
        {showAttachMenu && (
          <div className="absolute bottom-14 left-10 bg-white shadow-xl border border-gray-100 rounded-xl p-2 flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-4">
             {[
               { icon: ImageIcon, label: 'Photos', color: 'text-purple-500 bg-purple-50' },
               { icon: Video, label: 'Videos', color: 'text-pink-500 bg-pink-50' },
               { icon: File, label: 'Document', color: 'text-blue-500 bg-blue-50' },
               { icon: Music, label: 'Audio', color: 'text-orange-500 bg-orange-50' },
             ].map((item) => (
               <button key={item.label} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition text-sm font-medium text-gray-700">
                 <div className={`p-2 rounded-full ${item.color}`}>
                   <item.icon className="h-5 w-5" />
                 </div>
                 {item.label}
               </button>
             ))}
          </div>
        )}

        {/* Text Area */}
        <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2 focus-within:bg-white focus-within:ring-1 focus-within:ring-blue-400 transition border border-transparent focus-within:border-blue-200">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleInput}
            placeholder="Type a message..."
            rows={1}
            className="w-full bg-transparent outline-none text-gray-900 resize-none max-h-[120px] py-1"
          />
        </div>

        {/* Right Action (Mic or Send) */}
        <button className="mb-1 p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition flex items-center justify-center">
          {text.trim() ? <Send className="h-5 w-5 ml-0.5" /> : <Mic className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}