import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { groq, groqInitializationError } from '../lib/groq';
import { MessageCircle, Send, Bot, User, AlertTriangle } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your new AI assistant powered by Groq. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(groqInitializationError);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading || error) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = input;
    setInput('');
    setLoading(true);

    try {
      if (!groq) {
        throw new Error('Groq client is not initialized.');
      }
      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: messageToSend }],
        model: 'meta-llama/llama-4-scout-17b-16e-instruct', // Using the exact model name from your account
      });

      const response = chatCompletion.choices[0]?.message?.content || 'Sorry, I could not get a response.';

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (user) {
        await supabase.from('chat_history').insert([
          {
            user_id: user.id,
            message: messageToSend,
            response: response,
          },
        ]);
      }
    } catch (e) {
      console.error('Error sending message:', e);
      setError('An error occurred while communicating with the AI. Please check your API key and network connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg flex flex-col h-[600px]">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-t-xl flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-lg">
          <MessageCircle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold">AI Assistant</h2>
          <p className="text-sm text-blue-100">Ask me anything!</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="bg-blue-100 p-2 rounded-full h-fit">
                <Bot className="w-5 h-5 text-blue-600" />
              </div>
            )}
            <div
              className={`max-w-[75%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
            {message.role === 'user' && (
              <div className="bg-blue-600 p-2 rounded-full h-fit">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="bg-blue-100 p-2 rounded-full h-fit">
              <Bot className="w-5 h-5 text-blue-600" />
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {error ? (
        <div className="p-4 border-t border-gray-200 text-center text-red-600 bg-red-50">
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            <p className="font-medium">Chatbot Error</p>
          </div>
          <p className="text-sm mt-1">{error}</p>
        </div>
      ) : (
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
