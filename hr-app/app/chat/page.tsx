// app/chat/page.tsx
'use client';

import { useState } from 'react';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/images/logo.png';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

export default function ChatPage() {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hi! I’m your HR assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [savedChats, setSavedChats] = useState<string[][]>([]);

    const sendMessage = () => {
        if (!input.trim()) return;
        const newMessages = [...messages, { sender: 'user', text: input }];
        setMessages(newMessages);
        setInput('');
        setTimeout(() => {
            setMessages((prev) => [...prev, { sender: 'bot', text: 'Let me check that for you...' }]);
        }, 600);
    };

    const saveCurrentChat = () => {
        if (messages.length === 0) return;
      
        // Ensure the user has actually said something
        const hasUserMessage = messages.some(m => m.sender === 'user');
        if (!hasUserMessage) return;
      
        const existingChat = messages.map(m => `${m.sender}: ${m.text}`);
        const isDuplicate = savedChats.some(chat => chat.join('') === existingChat.join(''));
      
        if (!isDuplicate) {
          setSavedChats([...savedChats, existingChat]);
          setMessages([
            { sender: 'bot', text: 'Hi! I’m your HR assistant. How can I help you today?' }
          ]);
        }
      };

    const startNewChat = () => {
        saveCurrentChat();
        setMessages([
            { sender: 'bot', text: 'Hi! I’m your HR assistant. How can I help you today?' }
        ]);
    };

    return (
        <main
            className={`relative min-h-screen bg-gradient-to-bl from-[#101820] to-[#101820] text-white flex ${poppins.className}`}
        >
            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full bg-[#101820] w-64 z-20 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 font-bold border-b border-white/10 flex justify-between items-center">
                    <span>Saved Chats</span>
                    <button
                        onClick={startNewChat}
                        className="text-[#FEE715] text-lg font-bold hover:scale-110 transition"
                        title="Start new chat"
                    >
                        +
                    </button>
                </div>
                <ul className="p-4 space-y-2 overflow-y-auto max-h-[calc(100%-60px)]">
                    {savedChats.map((chat, idx) => (
                        <li key={idx} className="bg-white/10 p-2 rounded text-sm text-gray-300">
                            {chat.slice(0, 2).map((line, i) => (
                                <div key={i}>{line}</div>
                            ))}
                        </li>
                    ))}
                </ul>
            </aside>
            {/*The right side panel*/}
            <div className="flex-1 flex flex-col min-h-screen ml-0 md:ml-64">
                {/* Blobs */}
                <div className="absolute w-[200px] h-[200px] bg-[#27B4E4FF] opacity-100 rounded-full z-0" style={{ top: "50%", left: "10%", filter: "blur(250px)" }} />
                <div className="absolute w-[200px] h-[200px] bg-[#B733E3FF] opacity-100 rounded-full z-0" style={{ top: "30%", left: "50%", filter: "blur(250px)" }} />

                {/* Top Navigation bar */}
                <nav className="relative z-10 flex justify-between items-center px-6 py-4">
                    <div className="flex items-center gap-2">
                    </div>
                    <Link href="/" className="text-sm text-gray-300 hover:text-[#FEE715]">Log out</Link>
                </nav>

                {/* Chat Window */}
                <div className="relative z-10 flex-1 overflow-y-auto px-6 py-4 space-y-4 max-w-3xl mx-auto w-full max-h-[75vh]">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`p-3 max-w-[80%] rounded-lg ${msg.sender === 'user'
                                ? 'ml-auto bg-[#FEE715] text-black'
                                : 'mr-auto bg-white/10 text-white'
                                }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="relative z-10 px-6 py-4 border-t border-white/10">
                    <div className="max-w-3xl mx-auto flex gap-4">
                        <input
                            type="text"
                            className="flex-1 bg-white/10 text-white px-4 py-2 rounded-md focus:outline-none"
                            placeholder="Ask something about leave, travel, or documents..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <button
                            className="bg-[#FEE715] text-[#101820] px-4 py-2 rounded-md font-bold hover:bg-yellow-400 transition"
                            onClick={sendMessage}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
