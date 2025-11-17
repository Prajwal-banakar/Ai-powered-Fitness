import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { MessageCircle, Send, Bot, User } from 'lucide-react';

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
      content: "Hello! I'm your Fitness AI assistant. I can help you with questions about nutrition, workouts, fitness tips, and general health advice. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('diet') || lowerMessage.includes('nutrition') || lowerMessage.includes('eat')) {
      return "For optimal nutrition, focus on whole foods rich in protein, complex carbohydrates, and healthy fats. Aim for 5-6 smaller meals throughout the day to maintain energy levels. Include plenty of vegetables, lean proteins like chicken and fish, whole grains, and stay hydrated with 2-3 liters of water daily. Avoid processed foods, excessive sugar, and trans fats.";
    }

    if (lowerMessage.includes('workout') || lowerMessage.includes('exercise') || lowerMessage.includes('train')) {
      return "A balanced workout routine should include: 1) Strength training 3-4 times per week targeting different muscle groups, 2) Cardiovascular exercise 3-5 times per week for 30-45 minutes, 3) Flexibility work like yoga or stretching daily, and 4) Rest days for recovery. Always warm up before exercising and cool down after. Progressive overload is key to improvement.";
    }

    if (lowerMessage.includes('weight loss') || lowerMessage.includes('lose weight') || lowerMessage.includes('fat loss')) {
      return "Weight loss requires a caloric deficit combined with exercise. Aim for a moderate deficit of 300-500 calories below your maintenance level. Focus on protein-rich foods to preserve muscle, do both cardio and strength training, get 7-9 hours of sleep, manage stress, and be patient. Sustainable weight loss is 0.5-1 kg per week.";
    }

    if (lowerMessage.includes('muscle') || lowerMessage.includes('gain') || lowerMessage.includes('bulk')) {
      return "To build muscle, you need: 1) Progressive strength training 4-5 times per week, 2) Caloric surplus of 200-300 calories, 3) 1.6-2.2g protein per kg body weight daily, 4) Adequate rest and recovery with 7-9 hours sleep, 5) Compound exercises like squats, deadlifts, bench press. Stay consistent and track your progress.";
    }

    if (lowerMessage.includes('protein') || lowerMessage.includes('supplement')) {
      return "Protein requirements vary: 1.6-2.2g per kg for muscle building, 1.2-1.6g per kg for maintenance. Good sources include chicken, fish, eggs, Greek yogurt, legumes, and tofu. Protein supplements like whey can be convenient but aren't necessary. Other beneficial supplements include creatine monohydrate, vitamin D3, omega-3, and a quality multivitamin.";
    }

    if (lowerMessage.includes('cardio') || lowerMessage.includes('running') || lowerMessage.includes('walking')) {
      return "Cardio benefits heart health and burns calories. Options include: Walking (low impact, great for beginners), Running (high calorie burn), Cycling (low impact on joints), Swimming (full body workout), HIIT (efficient time-wise). Aim for 150 minutes moderate or 75 minutes vigorous cardio per week. Mix different types for best results.";
    }

    if (lowerMessage.includes('rest') || lowerMessage.includes('recovery') || lowerMessage.includes('sleep')) {
      return "Recovery is crucial for fitness progress. Get 7-9 hours of quality sleep, take 1-2 complete rest days per week, stay hydrated, eat adequate protein and calories, manage stress through meditation or yoga, and consider foam rolling or massage. Overtraining can lead to injury and burnout. Listen to your body.";
    }

    if (lowerMessage.includes('water') || lowerMessage.includes('hydration') || lowerMessage.includes('drink')) {
      return "Proper hydration is essential for performance and health. Aim for 2-3 liters daily, more if exercising intensely. Signs of good hydration include pale yellow urine and consistent energy. Drink water before, during, and after workouts. You can also get hydration from fruits, vegetables, and herbal teas.";
    }

    if (lowerMessage.includes('motivation') || lowerMessage.includes('consistent') || lowerMessage.includes('discipline')) {
      return "Staying motivated requires: 1) Set specific, measurable goals, 2) Create a routine and stick to it, 3) Track your progress, 4) Find a workout buddy or join a community, 5) Celebrate small wins, 6) Remember your 'why', 7) Prepare for obstacles, 8) Mix up your routine to prevent boredom. Consistency beats intensity over time.";
    }

    if (lowerMessage.includes('beginner') || lowerMessage.includes('start') || lowerMessage.includes('new')) {
      return "As a beginner, start slowly to prevent injury and burnout. Begin with 3 workouts per week, focusing on form over weight. Learn basic exercises like squats, push-ups, rows. Start with 20-30 minute sessions. Track your food to understand nutrition. Get adequate sleep. Be patient - results take 4-6 weeks. Consider hiring a trainer initially.";
    }

    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're welcome! I'm here to help you achieve your fitness goals. Feel free to ask me anything about nutrition, workouts, or general health advice. Keep up the great work!";
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! How can I assist you with your fitness journey today? I can provide advice on workouts, nutrition, weight loss, muscle building, and more!";
    }

    return "I'm here to help with fitness-related questions! I can provide guidance on workouts, nutrition, weight loss, muscle building, cardio, recovery, hydration, and motivation. What specific area would you like to know more about?";
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    setTimeout(async () => {
      const response = generateResponse(input);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      try {
        await supabase.from('chat_history').insert([
          {
            user_id: user?.id,
            message: input,
            response: response,
          },
        ]);
      } catch (error) {
        console.error('Error saving chat:', error);
      }

      setLoading(false);
    }, 800);
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
          <h2 className="text-xl font-bold">Fitness AI Assistant</h2>
          <p className="text-sm text-blue-100">Ask me anything about fitness!</p>
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

      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about workouts, nutrition, tips..."
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
    </div>
  );
}
