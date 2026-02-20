'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Card } from '@/components/ui';
import { mockMessages, getCurrentUser } from '@/lib/mockData';
import useAuthStore from '@/store/authStore';

// Icons
const MessageIcon = () => (
  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const SendIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const BackIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

function MessagesContent() {
  const searchParams = useSearchParams();
  const selectedUser = searchParams.get('user');
  const { user } = useAuthStore();
  const [threads, setThreads] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeThread, setActiveThread] = useState(selectedUser);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    // Mock threads for demo
    setThreads([
      {
        userId: 'driver-1',
        userName: 'Γιώργος Παπαδόπουλος',
        lastMessage: { text: 'Θα είμαι εκεί στις 8:00!', createdAt: new Date().toISOString() },
        unread: 1
      },
      {
        userId: 'driver-2',
        userName: 'Μαρία Κωνσταντίνου',
        lastMessage: { text: 'Ευχαριστώ για την κράτηση', createdAt: new Date(Date.now() - 86400000).toISOString() },
        unread: 0
      }
    ]);
  }, [user]);

  useEffect(() => {
    if (activeThread) {
      // Mock messages
      setMessages([
        {
          id: 1,
          senderId: activeThread,
          text: 'Γεια σου! Ευχαριστώ για την κράτηση.',
          createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 2,
          senderId: user?.$id || user?.id,
          text: 'Χαίρομαι που σας βρήκα! Θα είστε στην ώρα σας;',
          createdAt: new Date(Date.now() - 3000000).toISOString()
        },
        {
          id: 3,
          senderId: activeThread,
          text: 'Ναι, θα είμαι εκεί στις 8:00!',
          createdAt: new Date().toISOString()
        }
      ]);
    }
  }, [activeThread, user]);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('el-GR', { hour: '2-digit', minute: '2-digit' });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeThread) return;
    
    const newMsg = {
      id: Date.now(),
      senderId: user?.$id || user?.id,
      text: newMessage.trim(),
      createdAt: new Date().toISOString()
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const activeThreadData = threads.find(t => t.userId === activeThread);

  return (
    <div className="min-h-screen grain-bg pt-20">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Μηνύματα</h1>

        <div className="grid md:grid-cols-3 gap-6 h-[600px]">
          {/* Threads List */}
          <Card className={`overflow-hidden ${activeThread ? 'hidden md:block' : ''}`}>
            <div className="h-full overflow-y-auto">
              {threads.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <MessageIcon />
                  <p className="mt-2">Δεν έχετε μηνύματα</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {threads.map((thread) => (
                    <button
                      key={thread.userId}
                      onClick={() => setActiveThread(thread.userId)}
                      className={`w-full p-4 text-left transition-colors ${
                        activeThread === thread.userId 
                          ? 'bg-blue-50 border-l-4 border-blue-500' 
                          : 'hover:bg-gray-50 border-l-4 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white font-semibold">
                          {thread.userName?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">
                            {thread.userName}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {thread.lastMessage.text}
                          </div>
                        </div>
                        {thread.unread > 0 && (
                          <span className="w-5 h-5 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center font-medium">
                            {thread.unread}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Chat Area */}
          <Card className={`md:col-span-2 overflow-hidden ${!activeThread ? 'hidden md:flex' : ''}`}>
            {activeThread ? (
              <div className="h-full flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                  <button 
                    onClick={() => setActiveThread(null)}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <BackIcon />
                  </button>
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white font-semibold">
                    {activeThreadData?.userName?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{activeThreadData?.userName}</div>
                    <div className="text-xs text-green-600 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Ενεργός
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.senderId === (user?.$id || user?.id) ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm ${
                          msg.senderId === (user?.$id || user?.id)
                            ? 'bg-gray-900 text-white rounded-br-md'
                            : 'bg-white text-gray-900 rounded-bl-md border border-gray-200'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <span className={`text-xs mt-1 block ${
                          msg.senderId === (user?.$id || user?.id) ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {formatTime(msg.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <form onSubmit={sendMessage} className="p-4 border-t border-gray-100 bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Γράψτε μήνυμα..."
                      className="flex-1 px-4 py-3 bg-gray-100 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="px-6 py-3 bg-gray-900 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                      <SendIcon />
                      <span className="hidden sm:inline">Αποστολή</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                <MessageIcon />
                <p className="mt-4 text-lg">Επιλέξτε μια συνομιλία για να ξεκινήσετε</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen grain-bg pt-20">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Μηνύματα</h1>
          <div className="grid md:grid-cols-3 gap-6 h-[600px]">
            <div className="bg-white rounded-xl animate-pulse"></div>
            <div className="md:col-span-2 bg-white rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    }>
      <MessagesContent />
    </Suspense>
  );
}
