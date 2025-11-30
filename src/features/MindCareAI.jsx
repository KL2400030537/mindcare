import React, { useState } from "react";
import "./mindcareAI.css";

const emotionalResponses = [
  {
    topic: "anxiety",
    keywords: ["anxious", "anxiety", "panic", "scared", "fear", "overthinking"],
    reply:
      "It sounds like things feel overwhelming right now. 🌿 Anxiety often makes our mind jump into the future. Let’s try a grounding reset: slowly inhale for 4 seconds, hold for 2, and exhale for 6. Would you like a guided grounding or a journal prompt?",
  },
  {
    topic: "sadness",
    keywords: ["sad", "down", "cry", "empty", "hurt", "pain", "depressed"],
    reply:
      "I'm really sorry you're feeling this way. Your feelings are completely valid. 💛 Sometimes sadness is the mind asking for rest, compassion, or expression. Would you like an affirmation, a grounding technique, or a comfort prompt?",
  },
  {
    topic: "anger",
    keywords: ["angry", "mad", "rage", "frustrated", "irritated"],
    reply:
      "Anger usually comes from a place of unmet needs or boundaries. It's okay to feel it. 🔥 If you're comfortable, try unclenching your jaw and taking one slow breath. I can share a release technique or a reflection prompt if you want.",
  },
  {
    topic: "stress",
    keywords: ["stressed", "pressure", "overwhelmed", "tired", "burnout"],
    reply:
      "Stress builds quietly until it feels like too much. 🌧️ You're carrying a lot. Try placing your hand on your chest and taking one intentional deep breath. Would you like a calming affirmation or a stress-release activity?",
  },
  {
    topic: "loneliness",
    keywords: ["alone", "lonely", "isolated"],
    reply:
      "Feeling lonely can be very heavy. 💛 Even though I am a simple program, I care about what you’re going through. You deserve connection and understanding. I can offer grounding, comfort thoughts, or a self-connection prompt.",
  },
  {
    topic: "self_doubt",
    keywords: ["worthless", "not enough", "hate myself", "failure"],
    reply:
      "I'm really glad you shared this. These thoughts can be painful, but they are NOT facts. 💛 You are worthy of kindness, belonging, and care. Would you like a self-worth affirmation or a journaling reflection?",
  },
  {
    topic: "confusion",
    keywords: ["confused", "lost", "don’t know", "stuck"],
    reply:
      "It’s okay to not have everything figured out. 🌙 Feeling lost is usually the beginning of clarity. I can guide you through a clarity prompt or a grounding reflection.",
  },
];

const fallbackReplies = [
  "I’m here with you. 🌿 Would you like grounding, a journal prompt, or an affirmation?",
  "Thank you for sharing this with me. Your feelings matter. 💛 What would help you most right now?",
  "I'm listening. I can offer grounding, prompts, or comfort — just tell me what you need.",
];

const groundingExercises = [
  "🌱 **5-4-3-2-1 Grounding:** List 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.",
  "🌬 **Deep Breathing:** Inhale 4 sec → Hold 2 sec → Exhale 6 sec. Repeat 5 times.",
  "🧘 **Body Scan:** Relax your shoulders, unclench your jaw, loosen your hands, breathe slowly.",
  "🤲 **Warm Object:** Hold something warm (tea, a pillow, a blanket). Notice the sensation.",
  "👣 **Feet Grounding:** Press both feet into the floor and take slow breaths.",
];

const journalPrompts = [
  "What emotion feels the strongest right now, and why?",
  "What is something your inner child needs to hear?",
  "What do you wish someone understood about you today?",
  "Write one thing you can let go of today.",
  "What small win did you have recently?",
  "What’s one thing causing pressure lately? What’s one thing you can control?",
  "Describe a moment you felt genuinely calm.",
  "What would you say to a friend feeling how you feel right now?",
];

const affirmations = [
  "You are doing the best you can — and that is enough.",
  "Your feelings are valid.",
  "You deserve rest, love, and gentleness.",
  "You are allowed to slow down.",
  "You are not a burden.",
  "You don’t have to do everything perfectly to be worthy.",
  "One small step at a time is still progress.",
  "You are strong for surviving the days you thought you couldn’t.",
];

export default function MindCareAI() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello 🌿 I'm here with you. How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");

  const findEmotionalResponse = (text) => {
    const msg = text.toLowerCase();

    for (const response of emotionalResponses) {
      if (response.keywords.some((w) => msg.includes(w))) {
        return response.reply;
      }
    }

    return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    const botMsg = { sender: "bot", text: findEmotionalResponse(input) };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const handleQuickOption = (type) => {
    let reply = "";

    if (type === "grounding") {
      reply =
        groundingExercises[Math.floor(Math.random() * groundingExercises.length)];
    }
    if (type === "prompt") {
      reply = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
    }
    if (type === "affirm") {
      reply = affirmations[Math.floor(Math.random() * affirmations.length)];
    }

    setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
  };

  return (
    <div className="ai-container">
      <h2 className="ai-title">MindCare AI Helper 🌿</h2>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="options-bar">
        <button onClick={() => handleQuickOption("grounding")}>🌱 Grounding</button>
        <button onClick={() => handleQuickOption("prompt")}>✍️ Journal Prompt</button>
        <button onClick={() => handleQuickOption("affirm")}>💛 Affirmation</button>
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Share your thoughts..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
