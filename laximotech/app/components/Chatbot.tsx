"use client";
import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `You are Laxi, the friendly AI assistant for laximotech.ai — India's most affordable AI & Tech learning platform by Laximo Tech Solutions.

ABOUT LAXIMOTECH.AI:
- Online learning platform offering 40+ courses at ₹399 each
- Courses in AI, Python, Data Science, Machine Learning, Cybersecurity, Robotics, Web Development, IoT
- Hindi + English dual mode
- Verifiable digital certificates
- Based in Greater Noida West, UP, India
- Physical centre available for demo classes

ABOUT LAXIMO TECH SOLUTIONS (Parent Company):
- Full-service IT company: Web Design, App Development, Digital Marketing, AI Automation
- 8+ years experience, 150+ clients, 5 global markets
- Served: HCL Technologies, India TV, Aaj Tak, Salesforce, SpaceCart
- Markets: India, UAE, Maldives, USA, China, Hong Kong
- Rating: 4.9/5 from 150+ Google Reviews
- Services: Web Design, Mobile Apps, E-Commerce, SEO, Social Media Marketing, PPC, Branding, AI Automation, Lead Generation, SaaS Development, Business Consultation, 24x7 Support
- Contact: +91-8800236087, +91-9504782920
- Email: info@laximotechsolutions.com
- Address: F1, G-004, Amrapali Leisure Park, Techzone-4, Sector-2, Greater Noida West, Noida Extension, UP

COURSES AT ₹399:
- AI for Absolute Beginners (20 hrs)
- Python Foundation (40 hrs)
- Machine Learning Fundamentals (40 hrs)
- Data Science with Python (48 hrs)
- Deep Learning & Neural Networks (48 hrs)
- Generative AI & Prompt Engineering (24 hrs)
- Cybersecurity Fundamentals (24 hrs)
- Ethical Hacking (40 hrs)
- Web Development Full Stack (60 hrs)
- Robotics for Beginners (48 hrs)
- Arduino & Microcontrollers (48 hrs)
- IoT - Internet of Things (40 hrs)
- SQL for Data Analysts (24 hrs)
- Excel for Data Analysis (15 hrs)

CAREER PATHS (each 5 courses × ₹399 = ₹1,995 total):
- AI/ML Engineer: ₹12-80 LPA
- Data Analyst: ₹4-25 LPA
- Full Stack Developer: ₹5-35 LPA
- IoT/Robotics Engineer: ₹5-40 LPA

FAQ:
- Certificate valid for jobs? Yes, unique verifiable ID, shareable on LinkedIn
- Prior coding needed? No, courses start from absolute zero
- Hindi available? Yes, all courses in Hindi + English with subtitles
- ₹399 monthly or one-time? One-time, lifetime access
- Mobile access? Yes, fully mobile-optimized
- Free demo? Yes, free Robotics & AI demo at Greater Noida West centre

Answer questions helpfully, concisely, and in a friendly tone. If asked about IT services (web design, app development, digital marketing), answer based on Laximo Tech Solutions info. If asked about courses or learning, answer based on laximotech.ai info. Keep responses under 100 words unless detail is needed. Always end with a helpful follow-up offer.`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_QUESTIONS = [
  "What courses do you offer?",
  "How much does a course cost?",
  "Is the certificate valid?",
  "Do you offer IT services?",
  "How to contact you?",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Laxi 👋 Your AI assistant for laximotech.ai. Ask me anything about our courses, certificates, career paths, or IT services!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async (text?: string) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      });
      const data = await res.json();
      const reply = data.reply || "Sorry, I could not process that!";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Oops! Something went wrong. Please try again or contact us at info@laximotechsolutions.com" }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* CHAT BUBBLE */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed', bottom: '28px', right: '28px', zIndex: 1000,
          width: '60px', height: '60px', borderRadius: '50%',
          background: '#1F4E79', border: 'none', cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(31,78,121,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '26px', transition: 'transform 0.2s'
        }}
        title="Chat with Laxi"
      >
        {open ? '✕' : '💬'}
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div style={{
          position: 'fixed', bottom: '100px', right: '28px', zIndex: 999,
          width: '380px', height: '540px', background: '#fff',
          borderRadius: '20px', boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          border: '1px solid #e0eaf3'
        }}>

          {/* HEADER */}
          <div style={{ background: '#1F4E79', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
              🤖
            </div>
            <div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '15px', color: '#fff' }}>Laxi — AI Assistant</div>
              <div style={{ fontSize: '12px', color: '#A8D5F5', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ADE80', display: 'inline-block' }}></span>
                Online · laximotech.ai
              </div>
            </div>
          </div>

          {/* MESSAGES */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#F8FBFF' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '78%', padding: '10px 14px', borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.role === 'user' ? '#1F4E79' : '#fff',
                  color: msg.role === 'user' ? '#fff' : '#1A1A2E',
                  fontSize: '14px', lineHeight: '1.6',
                  border: msg.role === 'assistant' ? '1px solid #e0eaf3' : 'none',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ background: '#fff', border: '1px solid #e0eaf3', borderRadius: '18px 18px 18px 4px', padding: '10px 16px', fontSize: '20px', letterSpacing: '2px' }}>
                  ···
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* QUICK QUESTIONS */}
          {messages.length <= 1 && (
            <div style={{ padding: '8px 12px', display: 'flex', gap: '6px', flexWrap: 'wrap', borderTop: '1px solid #f0f0f0', background: '#fff' }}>
              {QUICK_QUESTIONS.map((q, i) => (
                <button key={i} onClick={() => sendMessage(q)}
                  style={{ background: '#F0F8FF', color: '#1F4E79', border: '1px solid #D0E8F5', borderRadius: '16px', padding: '5px 10px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* INPUT */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid #eee', background: '#fff', display: 'flex', gap: '8px' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask me anything..."
              style={{ flex: 1, padding: '10px 14px', borderRadius: '24px', border: '1.5px solid #D0E8F5', fontSize: '14px', outline: 'none', fontFamily: 'Inter, sans-serif' }}
              onFocus={e => e.target.style.borderColor = '#1F4E79'}
              onBlur={e => e.target.style.borderColor = '#D0E8F5'}
            />
            <button onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              style={{ width: '42px', height: '42px', borderRadius: '50%', background: input.trim() ? '#FF6B00' : '#eee', border: 'none', cursor: input.trim() ? 'pointer' : 'default', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              ➤
            </button>
          </div>

        </div>
      )}
    </>
  );
}