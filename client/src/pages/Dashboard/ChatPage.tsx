import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import { Loader2, Send, Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingHistory, setIsFetchingHistory] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/chat');
        setMessages(response.data.data.history);
      } catch (error) {
        console.error('Failed to fetch chat history', error);
      } finally {
        setIsFetchingHistory(false);
      }
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userPrompt = input.trim();
    setInput('');
    
    // Optimistic UI update
    const tempId = Date.now().toString();
    setMessages(prev => [...prev, { _id: tempId, prompt: userPrompt, response: null }]);
    setIsLoading(true);

    try {
      const response = await api.post('/chat', { prompt: userPrompt });
      const newChat = response.data.data.chat;
      
      setMessages(prev => prev.map(msg => msg._id === tempId ? newChat : msg));
    } catch (error) {
      console.error('Failed to send message', error);
      setMessages(prev => prev.filter(msg => msg._id !== tempId));
      alert('Failed to send message.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetchingHistory) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-neutral-950 text-white flex flex-col pt-12 md:pt-16 pb-6 px-4 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        <div className="mb-6 shrink-0">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Career Assistant
          </h1>
          <p className="text-neutral-400 mt-2">Powered by Groq Llama-3 for ultra-fast advice.</p>
        </div>

        <div className="flex-1 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl relative">
          
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-neutral-500 space-y-4">
                <Bot size={48} className="text-indigo-500/50" />
                <p>Hello! Ask me about your career, skills, or interview prep.</p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div key={msg._id || index} className="space-y-6">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] md:max-w-[75%] bg-indigo-600 text-white rounded-2xl rounded-tr-sm px-5 py-3 shadow-md">
                    <p className="text-sm whitespace-pre-wrap">{msg.prompt}</p>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex justify-start">
                  <div className="flex items-end space-x-2 max-w-[85%] md:max-w-[75%]">
                    <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center shrink-0 mb-1 border border-neutral-700">
                      <Bot size={16} className="text-indigo-400" />
                    </div>
                    <div className="bg-neutral-800/80 border border-neutral-700 text-neutral-200 rounded-2xl rounded-bl-sm px-5 py-3 shadow-md">
                      {msg.response ? (
                        <div className="text-sm whitespace-pre-wrap leading-relaxed prose prose-invert max-w-none">
                          {msg.response}
                        </div>
                      ) : (
                        <div className="flex space-x-1.5 h-5 items-center">
                          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-neutral-950 border-t border-neutral-800 shrink-0">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for career advice..."
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl py-3 pl-4 pr-12 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChatPage;
