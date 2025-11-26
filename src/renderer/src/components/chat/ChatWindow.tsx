import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { User, Message } from "../../types/chat";

// Mock Data
const CURRENT_USER_ID = "me";

const MOCK_USER: User = {
  id: "u1",
  name: "Kane Mani",
  status: "online",
  lastSeen: "Last seen today at 10:30 AM",
};

const MOCK_MESSAGES: Message[] = [
  {
    id: "m1",
    senderId: "u1",
    content: "Hey! Did you see the new design updates?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    status: "read",
  },
  {
    id: "m2",
    senderId: "me",
    content: "Yes, I just checked them out. They look fantastic! 🎨",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    status: "read",
  },
  {
    id: "m3",
    senderId: "u1",
    content:
      "Great! I was thinking we could implement the sidebar changes first.",
    timestamp: new Date(Date.now() - 1000 * 60 * 29),
    status: "read",
  },
  {
    id: "m4",
    senderId: "me",
    content: "Agreed. I have already started on the component structure.",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    status: "delivered",
    replyTo: {
      id: "m3",
      senderId: "u1",
      content:
        "Great! I was thinking we could implement the sidebar changes first.",
      timestamp: new Date(),
      status: "read",
    },
  },
  {
    id: "m5",
    senderId: "u1",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    status: "read",
    attachments: [
      {
        id: "a1",
        type: "image",
        url: "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        name: "design-preview.jpg",
      },
    ],
  },
  {
    id: "m6",
    senderId: "u1",
    content: "Here is the reference image I was talking about.",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    status: "read",
  },
];

export function ChatWindow() {
  return (
    <div className="flex flex-col h-full w-full bg-[#f0f2f5]">
      <ChatHeader user={MOCK_USER} pinnedMessage={MOCK_MESSAGES[0]} />
      <MessageList messages={MOCK_MESSAGES} currentUserId={CURRENT_USER_ID} />
      <MessageInput />
    </div>
  );
}
