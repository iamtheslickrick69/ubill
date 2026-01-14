import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Sparkles, Zap, Loader2, Bot, User, AlertCircle, Lightbulb, Sun, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { sendChatMessage, ChatMessage } from '@/services/openai';
import { useGamification } from '@/context/GamificationContext';
import { useToast } from '@/hooks/use-toast';
import { useAILoading } from '@/context/AILoadingContext';
import { GlowingEffect } from '@/components/ui/glowing-effect';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatInterface = () => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addXP, incrementQuestions } = useGamification();
  const { toast } = useToast();
  const { setIsAILoading } = useAILoading();

  const suggestions = [
    { text: "How can I lower my bill?", icon: Lightbulb },
    { text: "What's using the most energy?", icon: Zap },
    { text: "Am I ready for solar?", icon: Sun },
    { text: "Explain my charges", icon: BarChart3 },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsAILoading(true); // Trigger animated dots
    setError(null);

    // Convert messages to API format
    const chatHistory: ChatMessage[] = [...messages, userMessage].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const response = await sendChatMessage(chatHistory);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Award XP for asking a question
      addXP(10, 'Asked a question');
      incrementQuestions();

      toast({
        title: "⚡ +10 XP",
        description: "Great question! Keep learning about your energy.",
        duration: 2000,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get response';
      setError(errorMessage);

      if (errorMessage.includes('API key not configured')) {
        toast({
          title: "API Key Required",
          description: "Please add your OpenAI API key to the .env file.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } finally {
      setIsLoading(false);
      setIsAILoading(false); // Hide animated dots
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Main Heading */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
          Ask anything about your bill
        </h2>
        <p className="text-white/50 text-base">
          Our AI understands your energy usage and can answer any question
        </p>
      </motion.div>

      {/* Chat Messages Area */}
      <AnimatePresence>
        {messages.length > 0 && (
          <motion.div
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4 mb-4 max-h-96 overflow-y-auto shadow-apple"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <Bot className="w-4 h-4 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" strokeWidth={1.5} />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-secondary text-foreground rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <User className="w-4 h-4 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" strokeWidth={1.5} />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <Bot className="w-4 h-4 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" strokeWidth={1.5} />
                  </div>
                  <div className="bg-secondary text-foreground px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-2 text-sm text-destructive"
        >
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Chat Input Card - Minimalist Dark Style with Glowing Effect */}
      <motion.div
        className="relative rounded-[1.5rem] p-1 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Glowing Effect - Shows when AI is loading */}
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={!isLoading}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
          variant="electric-blue"
        />
        <div className={`relative bg-black/40 backdrop-blur-sm border rounded-[1.25rem] p-2 transition-all duration-300 ${
          isLoading ? 'border-blue-400/30' : isFocused ? 'border-white/20' : 'border-white/10'
        }`}>
        <div className="flex items-center gap-3">
          {/* AI Indicator */}
          <div className="flex-shrink-0 ml-2">
            <div className="w-10 h-10 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" strokeWidth={1.5} />
            </div>
          </div>

          {/* Input Field */}
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask me anything about your energy bill..."
            className="flex-1 border-0 bg-transparent text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0 text-base h-12"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            disabled={isLoading}
          />

          {/* Action Icons */}
          <div className="flex items-center gap-1 flex-shrink-0 mr-2">
            <button
              onClick={handleSend}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                input.trim() && !isLoading
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'bg-white/10 text-white/40'
              }`}
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <ArrowUp size={18} />
              )}
            </button>
          </div>
        </div>
        </div>
      </motion.div>

      {/* Suggestion Pills - Dark Minimalist Style */}
      {messages.length === 0 && (
        <motion.div
          className="flex flex-wrap gap-3 justify-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {suggestions.map((suggestion, index) => {
            const IconComponent = suggestion.icon;
            return (
              <motion.button
                key={index}
                onClick={() => handleSuggestionClick(suggestion.text)}
                className="group flex items-center gap-2 px-5 py-3 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-black/60 text-white/70 hover:text-white text-sm font-medium transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconComponent className="w-4 h-4 text-white" strokeWidth={1.5} />
                <span>{suggestion.text}</span>
              </motion.button>
            );
          })}
        </motion.div>
      )}

      {/* XP Hint */}
      <motion.p
        className="text-center text-sm text-white/40 flex items-center justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Zap className="w-4 h-4 text-white/50" strokeWidth={1.5} />
        <span>Earn 10 XP for each question you ask</span>
      </motion.p>
    </div>
  );
};

export default ChatInterface;
