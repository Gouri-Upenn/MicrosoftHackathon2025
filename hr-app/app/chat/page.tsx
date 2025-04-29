'use client';
{/*/app/chat/page.tsx*/}
import { useState, useEffect, useRef } from 'react';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/images/logo.png';
import { useRouter } from 'next/navigation';


const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

export default function ChatPage() {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hi! I’m your HR assistant. How can I help you today?' },
    ]);
    const [input, setInput] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [savedChats, setSavedChats] = useState<{ sender: string; text: string }[][]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null); // New ref


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
        // Find user messages (sent by 'user')
        const userMessages = messages.filter(m => m.sender === 'user');

        // Strict check: if no user message, do nothing
        if (userMessages.length === 0) return;

        const newChat = [...messages]; // Save the full objects, not strings
        const isDuplicate = savedChats.some(chat =>
            JSON.stringify(chat) === JSON.stringify(newChat)
        );

        if (!isDuplicate) {
            setSavedChats([...savedChats, newChat]);
            setMessages([{ sender: 'bot', text: 'Hi! I’m your HR assistant. How can I help you today?' }]);
        }
    };



    const startNewChat = () => {
        // Check if there are any user messages
        const userMessages = messages.filter(m => m.sender === 'user');
        if (userMessages.length > 0) {
            setSavedChats(prev => [...prev, [...messages]]);
        }
        // Always reset messages
        setMessages([{ sender: 'bot', text: 'Hi! I’m your HR assistant. How can I help you today?' }]);
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Handle logout logic
    const router = useRouter();

    const handleLogout = () => {
        // Clear any authentication/session logic here if needed
        // Example: localStorage.clear(); (or) localStorage.removeItem('token');

        router.push('/'); // Redirect to home page
    };



    return (
        <main className="relative overflow-hidden h-screen bg-gradient-to-bl from-[#101820] to-[#101820] text-white flex flex-col ${poppins.className}">
        {/* <main className={`relative flex flex-col overflow-hidden bg-transparent ${poppins.className}`}>*/}

            {/* Blobs */}
            {/* <div className="absolute w-[200px] h-[200px] bg-[#0EA1D2FF] opacity-100 rounded-full z-0" style={{ top: "50%", left: "10%", filter: "blur(250px)" }} />
            <div className="absolute w-[200px] h-[200px] bg-[#B733E3FF] opacity-100 rounded-full z-0" style={{ top: "30%", left: "50%", filter: "blur(250px)" }} /> */}

            {/*  */}

            {/* Sidebar */}
            {/* <aside className={`fixed top-0 left-0 h-full bg-[#101820] w-64 z-30 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}> */}
            <aside className="fixed top-[72px] left-0 h-full w-64 z-30 bg-black/40 backdrop-blur-md text-white flex flex-col">

                <div className="px-4 py-1 font-normal border-white/10 flex justify-between items-center">
                    <span>Saved Chats</span>
                    <button
                        onClick={startNewChat}
                        className="text-[#FEE715] text-[35px] font-thin cursor-pointer transition"
                        title="Start new chat"
                    >
                        +
                    </button>
                </div>

                {/* Scrollable area */}
                <ul className="flex-1 p-4 overflow-y-auto space-y-2 scrollbar-hide">
                    {savedChats.map((chat, idx) => (
                        <li
                            key={idx}
                            onClick={() => setMessages(chat)}
                            className="bg-white/10 p-2 rounded text-sm text-gray-300 cursor-pointer hover:bg-white/20 transition"
                        >
                            {chat.slice(0, 2).map((line, i) => (
                                <div key={i}>
                                    <strong>{line.sender === 'user' ? 'You' : 'Bot'}:</strong> {line.text}
                                </div>
                            ))}
                            {chat.length > 2 && (
                                <div className="text-xs opacity-50">+ {chat.length - 2} more...</div>
                            )}
                        </li>
                    ))}
                </ul>
            </aside>



            {/* Main Panel */}
            <div className="flex flex-1 flex-col ml-0 md:ml-64 relative z-10">
                {/* Chat Area */}
                <div className="relative z-10 flex-1 overflow-y-scroll px-6 pt-24 space-y-4 max-w-3xl mx-auto w-full max-h-[80vh] scrollbar-hide">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`p-3 max-w-[90%] rounded-lg ${msg.sender === 'user' ? 'ml-auto bg-[#FEE715] text-black' : 'mr-auto bg-white/10 text-white'}`}
                        >
                            {msg.text}
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>

                {/* Chat Input */}
                <div className="relative z-10 px-6 py-4">
                    <div className="max-w-3xl mx-auto flex items-center gap-4">
                        {/* Attachment Icon */}
                        <label className="cursor-pointer text-white hover:text-[#FEE715] transition">
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) console.log('Uploaded file:', file.name);
                                }}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 12v6a4.5 4.5 0 01-9 0V6a3 3 0 016 0v9a1.5 1.5 0 01-3 0V7" />
                            </svg>
                        </label>

                        {/* Input Box */}
                        <input
                            type="text"
                            className="flex-1 bg-white/10 text-white px-6 py-3 rounded-full focus:outline-none"
                            placeholder="Ask about leaves, raise a ticket, or inquire about policies..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        />

                        {/* Send Button */}
                        <button
                            className="bg-[#FEE715] text-[#101820] px-6 py-3 rounded-full font-bold hover:bg-yellow-400 transition"
                            onClick={sendMessage}
                        >
                            send
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
