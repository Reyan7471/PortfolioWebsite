import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Bot, User, Zap, Brain, MessageCircle } from "lucide-react";
import { Link } from "wouter";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  confidence?: number;
  intent?: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  lastActive: Date;
}

const knowledgeTopics = [
  "Technology", "Programming", "Data Science", "Web Development", 
  "Career Advice", "Education", "General Knowledge"
];

const sampleResponses = {
  "hello": "Hello! I'm an advanced AI chatbot. How can I assist you today?",
  "help": "I can help you with various topics including technology, programming, career advice, and more. What would you like to know?",
  "technology": "Technology is constantly evolving! I can discuss topics like AI, machine learning, web development, mobile apps, and emerging trends. What specific area interests you?",
  "programming": "Programming is a fascinating field! I can help with various languages like Python, JavaScript, Java, and more. I can also discuss algorithms, data structures, and best practices. What would you like to learn?",
  "data science": "Data science combines statistics, programming, and domain expertise to extract insights from data. Key tools include Python, R, SQL, and libraries like pandas, scikit-learn, and TensorFlow. Are you interested in a specific aspect?",
  "career": "Career development is crucial for professional growth. I can provide advice on resume building, interview preparation, skill development, and career transitions. What specific career guidance do you need?",
  "default": "That's an interesting question! While I try to be helpful across many topics, I might not have specific information about that. Could you rephrase your question or ask about something else I might be able to help with?"
};

export default function AdvancedChatbot() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentSession = sessions.find(s => s.id === currentSessionId);

  useEffect(() => {
    // Create initial session
    if (sessions.length === 0) {
      createNewSession();
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: `Chat ${sessions.length + 1}`,
      messages: [
        {
          id: "welcome",
          content: "Hello! I'm an advanced AI chatbot with knowledge across multiple domains. I can help you with technology, programming, data science, career advice, and more. How can I assist you today?",
          sender: "bot",
          timestamp: new Date(),
          confidence: 0.95,
          intent: "greeting"
        }
      ],
      lastActive: new Date()
    };

    setSessions(prev => [...prev, newSession]);
    setCurrentSessionId(newSession.id);
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Simple intent detection
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return sampleResponses.hello;
    }
    if (lowerMessage.includes("help") || lowerMessage.includes("what can you do")) {
      return sampleResponses.help;
    }
    if (lowerMessage.includes("technology") || lowerMessage.includes("tech")) {
      return sampleResponses.technology;
    }
    if (lowerMessage.includes("programming") || lowerMessage.includes("code") || lowerMessage.includes("developer")) {
      return sampleResponses.programming;
    }
    if (lowerMessage.includes("data science") || lowerMessage.includes("machine learning") || lowerMessage.includes("analytics")) {
      return sampleResponses["data science"];
    }
    if (lowerMessage.includes("career") || lowerMessage.includes("job") || lowerMessage.includes("resume")) {
      return sampleResponses.career;
    }
    
    return sampleResponses.default;
  };

  const detectIntent = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) return "greeting";
    if (lowerMessage.includes("help")) return "help_request";
    if (lowerMessage.includes("technology")) return "technology_inquiry";
    if (lowerMessage.includes("programming")) return "programming_question";
    if (lowerMessage.includes("data science")) return "data_science_query";
    if (lowerMessage.includes("career")) return "career_advice";
    return "general_inquiry";
  };

  const getConfidenceScore = (message: string): number => {
    const keywords = ["technology", "programming", "data science", "career", "hello", "help"];
    const foundKeywords = keywords.filter(keyword => 
      message.toLowerCase().includes(keyword)
    ).length;
    
    return Math.min(0.95, 0.6 + (foundKeywords * 0.1));
  };

  const sendMessage = async () => {
    if (!message.trim() || !currentSession) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message.trim(),
      sender: "user",
      timestamp: new Date()
    };

    // Add user message
    setSessions(prev =>
      prev.map(session =>
        session.id === currentSessionId
          ? {
              ...session,
              messages: [...session.messages, userMessage],
              lastActive: new Date()
            }
          : session
      )
    );

    setMessage("");
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(userMessage.content),
        sender: "bot",
        timestamp: new Date(),
        confidence: getConfidenceScore(userMessage.content),
        intent: detectIntent(userMessage.content)
      };

      setSessions(prev =>
        prev.map(session =>
          session.id === currentSessionId
            ? {
                ...session,
                messages: [...session.messages, botResponse],
                lastActive: new Date()
              }
            : session
        )
      );

      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="icon" data-testid="back-to-home">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground" data-testid="chatbot-title">
                Advanced AI Chatbot
              </h1>
              <p className="text-muted-foreground mt-1" data-testid="chatbot-subtitle">
                Intelligent conversational AI with multi-domain knowledge
              </p>
            </div>
          </div>
          <Button onClick={createNewSession} data-testid="new-chat">
            <MessageCircle className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Chat History */}
          <div className="lg:col-span-1">
            <Card data-testid="chat-sessions-card">
              <CardHeader>
                <CardTitle className="text-lg">Chat Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      currentSessionId === session.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setCurrentSessionId(session.id)}
                    data-testid={`session-${session.id}`}
                  >
                    <div className="font-medium truncate">{session.title}</div>
                    <div className="text-xs opacity-70">
                      {session.messages.length} messages
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-6" data-testid="knowledge-topics-card">
              <CardHeader>
                <CardTitle className="text-lg">Knowledge Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {knowledgeTopics.map((topic) => (
                    <Badge key={topic} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col" data-testid="chat-interface">
              <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">AI Assistant</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Online • Ready to help
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-hidden p-0">
                <div className="h-full flex flex-col">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4" data-testid="messages-container">
                    {currentSession?.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex gap-3 ${
                          msg.sender === "user" ? "justify-end" : "justify-start"
                        }`}
                        data-testid={`message-${msg.id}`}
                      >
                        {msg.sender === "bot" && (
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="h-4 w-4 text-primary-foreground" />
                          </div>
                        )}
                        
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.sender === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <div className="text-sm">{msg.content}</div>
                          
                          {msg.sender === "bot" && (
                            <div className="flex items-center gap-2 mt-2 text-xs opacity-70">
                              {msg.confidence && (
                                <Badge variant="outline" className="text-xs">
                                  {Math.round(msg.confidence * 100)}% confidence
                                </Badge>
                              )}
                              {msg.intent && (
                                <Badge variant="outline" className="text-xs">
                                  {msg.intent.replace("_", " ")}
                                </Badge>
                              )}
                            </div>
                          )}
                          
                          <div className="text-xs opacity-50 mt-1">
                            {msg.timestamp.toLocaleTimeString()}
                          </div>
                        </div>

                        {msg.sender === "user" && (
                          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1"
                        disabled={isTyping}
                        data-testid="message-input"
                      />
                      <Button
                        onClick={sendMessage}
                        disabled={!message.trim() || isTyping}
                        data-testid="send-message"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Brain className="h-3 w-3" />
                        AI-powered responses
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        Real-time processing
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}