"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your VisionGuard AI assistant. How can I help with your eye health today?",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages([...messages, { text: input, isUser: true }]);
    setInput("");

    // Simulate AI response after a short delay
    setTimeout(() => {
      let response = "";

      if (
        input.toLowerCase().includes("tired") ||
        input.toLowerCase().includes("strain")
      ) {
        response =
          "It sounds like you might be experiencing eye strain. I recommend taking a break using the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.";
      } else if (
        input.toLowerCase().includes("doctor") ||
        input.toLowerCase().includes("specialist")
      ) {
        response =
          "Would you like me to connect you with an eye care specialist? We have professionals available for virtual consultations.";
      } else if (
        input.toLowerCase().includes("exercise") ||
        input.toLowerCase().includes("exercises")
      ) {
        response =
          "Eye exercises can help reduce fatigue. Try palming (covering your eyes with warm palms), focusing on near and far objects alternately, or circular eye movements.";
      } else {
        response =
          "Thank you for your message. Is there anything specific about your eye health you'd like to know more about?";
      }

      setMessages((prev) => [...prev, { text: response, isUser: false }]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-lg bg-zinc-900 border border-zinc-800 shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Chat header */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-4 text-white">
              <div className="flex items-center">
                <Bot size={20} className="mr-2" />
                <h3 className="font-medium">VisionGuard AI Assistant</h3>
              </div>
              <p className="text-xs text-blue-100 mt-1">
                Get instant eye health recommendations
              </p>
            </div>

            {/* Chat messages */}
            <div className="h-80 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${
                      message.isUser ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        message.isUser ? "bg-blue-600" : "bg-zinc-700"
                      }`}
                    >
                      {message.isUser ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.isUser
                          ? "bg-blue-600 text-white"
                          : "bg-zinc-800 text-zinc-100"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chat input */}
            <div className="border-t border-zinc-800 p-4">
              <div className="flex gap-2">
                <Input
                  className="flex-1 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus-visible:ring-blue-500"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button
                  size="icon"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleSendMessage}
                >
                  <Send size={16} />
                </Button>
              </div>
              <div className="mt-2 text-center">
                <button className="text-xs text-blue-400 hover:text-blue-300">
                  Connect with a live doctor →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
