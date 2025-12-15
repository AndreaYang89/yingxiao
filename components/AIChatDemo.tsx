import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { generateExpertResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AIChatDemo: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '您好，我是 Nexus 业务专家 (Expert) 智能体。我可以为您解析全球宏观趋势，或协助您筛选适合家办客户的 Alpha 策略。请问有什么可以帮您？' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    
    // Add User Message
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    // Call Gemini
    const responseText = await generateExpertResponse(userText);

    // Add Model Message
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex flex-col h-[500px] w-full max-w-2xl mx-auto glass-card rounded-2xl overflow-hidden shadow-2xl border-slate-700/50">
      {/* Header */}
      <div className="bg-slate-900/80 p-4 border-b border-slate-700 flex items-center gap-3">
        <div className="p-2 bg-primary-500/20 rounded-lg">
          <Sparkles className="w-5 h-5 text-primary-400" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-100">Nexus AI Expert</h3>
          <p className="text-xs text-slate-400">Powered by Gemini 2.5 Flash</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'model' ? 'bg-primary-600' : 'bg-slate-600'}`}>
              {msg.role === 'model' ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'model' 
                ? 'bg-slate-800 text-slate-200 rounded-tl-none' 
                : 'bg-primary-600 text-white rounded-tr-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
              <Bot size={16} />
            </div>
            <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
               <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
               <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
               <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-900/80 border-t border-slate-700">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="询问关于 PE 份额或 Nexus 系统功能..."
            className="w-full bg-slate-800 border border-slate-600 rounded-full py-3 px-5 text-slate-200 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 pr-12 transition-all placeholder-slate-500"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 bg-primary-600 hover:bg-primary-500 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};