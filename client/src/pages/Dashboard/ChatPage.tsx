import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import { Loader2, Send, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

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
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="gradient-bg"></div>
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] text-white flex flex-col pt-12 md:pt-16 pb-6 px-4 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="gradient-bg"></div>
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col relative z-10">
        <div className="mb-6 shrink-0">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 animate-gradient">
            Career Assistant
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Powered by Groq Llama-3 for ultra-fast advice.</p>
        </div>

        <div className="flex-1 glass-card border-t border-l border-white/10 rounded-2xl flex flex-col overflow-hidden relative">
           <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 relative z-10">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                <div className="p-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                  <Bot size={48} className="text-indigo-400" />
                </div>
                <p>Hello! Ask me about your career, skills, or interview prep.</p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div key={msg._id || index} className="space-y-6">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] md:max-w-[75%] btn-gradient text-white rounded-2xl rounded-tr-sm px-5 py-3 shadow-[0_4px_15px_rgba(129,140,248,0.3)]">
                    <p className="text-sm whitespace-pre-wrap">{msg.prompt}</p>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex justify-start">
                  <div className="flex items-end space-x-3 max-w-[85%] md:max-w-[75%]">
                    <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center shrink-0 mb-1 border border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                      <Bot size={16} className="text-indigo-400" />
                    </div>
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 text-gray-200 rounded-2xl rounded-bl-sm px-5 py-3 shadow-lg">
                      {msg.response ? (
                        <div className="text-sm leading-relaxed prose prose-invert max-w-none">
                          <ReactMarkdown>{msg.response}</ReactMarkdown>
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
          <div className="p-4 bg-black/40 backdrop-blur-md border-t border-white/10 shrink-0 relative z-10">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for career advice..."
                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-2 btn-gradient text-white rounded-lg disabled:opacity-50 transition-all shadow-[0_0_10px_rgba(129,140,248,0.2)]"
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
