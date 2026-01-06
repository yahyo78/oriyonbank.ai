"use client";

import axios from "axios";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
}

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatDrawer({ isOpen, onClose }: ChatDrawerProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Здравствуйте! Я бот-консультант Ориёнбонк. Чем могу помочь?",
      sender: "bot",
      timestamp: "10:23",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [typingMessage, setTypingMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, typingMessage]);

  // Typing animation effect
  useEffect(() => {
    if (isTyping && typingMessage) {
      const fullText = typingMessage;
      const botMessageId = `typing-${Date.now()}`;
      setTypingMessageId(botMessageId);
      let currentIndex = 0;

      // Create initial empty message
      setMessages((prev) => [
        ...prev,
        {
          id: botMessageId,
          text: "",
          sender: "bot" as const,
          timestamp: getCurrentTime(),
        },
      ]);

      const typeNextChar = () => {
        if (currentIndex < fullText.length) {
          const currentText = fullText.substring(0, currentIndex + 1);
          
          setMessages((prev) => {
            const updated = [...prev];
            const messageIndex = updated.findIndex((msg) => msg.id === botMessageId);
            if (messageIndex !== -1) {
              updated[messageIndex] = {
                ...updated[messageIndex],
                text: currentText,
              };
            }
            return updated;
          });

          currentIndex++;
          typingTimeoutRef.current = setTimeout(typeNextChar, 30);
        } else {
          setIsTyping(false);
          setTypingMessage("");
          setTypingMessageId(null);
        }
      };

      typingTimeoutRef.current = setTimeout(typeNextChar, 100);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [isTyping, typingMessage]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await axios.post<{ answer: string }>(
        "http://127.0.0.1:8000/api/chat/",
        {
          message: messageText,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setLoading(false);
      setTypingMessage(response.data.answer);
      setIsTyping(true);
    } catch (error: any) {
      console.error("API ERROR:", error);
      console.error("Error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });
      
      setLoading(false);
      let errorText = "Извините, произошла техническая ошибка. Пожалуйста, попробуйте еще раз.";
      if (error.response?.status === 403 || error.response?.status === 401) {
        errorText = "Ошибка аутентификации. Пожалуйста, проверьте данные для входа.";
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorText,
        sender: "bot",
        timestamp: getCurrentTime(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  async function postChat() {
    if (!message.trim() || loading) return;

    const messageText = message.trim();
    setMessage("");
    await sendMessage(messageText);
  }

  const handleQuickAction = () => {
    const quickMessage = "Я хочу накопить деньги, какой вклад подходит?";
    sendMessage(quickMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      postChat();
    }
  };

  const showQuickAction = messages.length === 1 && messages[0].sender === "bot";

  // Close on outside click
  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('.chat-drawer-content') === null) {
          onClose();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  return (
    <>
      {/* Drawer - No overlay, transparent background */}
      <div 
        className={`chat-drawer-content fixed bottom-0 right-0 w-[420px] h-[90vh] bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-300 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              ОБ
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Ориёнбонк</h2>
              <p className="text-sm text-gray-500">Онлайн</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="flex justify-center">
            <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
              Сегодня
            </span>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === "user" ? "justify-end" : ""
              }`}
            >
              {msg.sender === "bot" && (
                <div className="w-8 h-8 bg-amber-300 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  ОБ
                </div>
              )}
              <div
                className={`flex flex-col max-w-[70%] ${
                  msg.sender === "user" ? "items-end" : ""
                }`}
              >
                <div
                  className={`${
                    msg.sender === "user"
                      ? "bg-amber-300 rounded-2xl rounded-tr-md"
                      : "bg-white rounded-2xl rounded-tl-md"
                  } px-4 py-3 shadow-sm`}
                >
                  <p
                    className={`${
                      msg.sender === "user"
                        ? "text-gray-900"
                        : "text-gray-800"
                    } text-[15px] leading-relaxed whitespace-pre-wrap`}
                  >
                    {msg.text}
                    {msg.id === typingMessageId && isTyping && (
                      <span
                        className="inline-block w-0.5 h-4 bg-gray-600 ml-1 align-middle"
                        style={{
                          animation: "blink-cursor 1s infinite",
                        }}
                      />
                    )}
                  </p>
                </div>
                <span
                  className={`text-xs text-gray-500 mt-1 ${
                    msg.sender === "user" ? "mr-2" : "ml-2"
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-300 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                ОБ
              </div>
              <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    style={{
                      animation: "typing-dot 1.4s infinite",
                      animationDelay: "0ms",
                    }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    style={{
                      animation: "typing-dot 1.4s infinite",
                      animationDelay: "200ms",
                    }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    style={{
                      animation: "typing-dot 1.4s infinite",
                      animationDelay: "400ms",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Action */}
        {showQuickAction && (
          <div className="bg-white border-t border-gray-200 px-4 py-3">
            <button
              onClick={handleQuickAction}
              disabled={loading}
              className="w-full bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-700 rounded-2xl px-4 py-3 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>Я хочу накопить деньги, какой вклад подходит?</span>
            </button>
          </div>
        )}

        {/* Input */}
        <div className="bg-white border-t border-gray-200 px-4 py-4">
          <div className="flex items-end gap-3">
            <div className="flex-1 bg-gray-100 rounded-3xl px-4 py-3 flex items-end gap-3 min-h-[50px] max-h-32">
              <input
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                value={message}
                placeholder="Напишите сообщение..."
                className="flex-1 bg-transparent border-none outline-none resize-none text-gray-800 placeholder-gray-500 text-[15px] overflow-y-auto"
                style={{ maxHeight: "120px" }}
                disabled={loading}
              />
              <button
                onClick={postChat}
                disabled={loading || !message.trim()}
                className="p-1.5 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
            <button
              onClick={postChat}
              disabled={loading || !message.trim()}
              className="bg-amber-300 hover:bg-amber-400 text-gray-900 rounded-full p-3 transition-colors flex-shrink-0 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

