import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Laxi, the friendly AI assistant for laximotech.ai — India's most affordable AI & Tech learning platform by Laximo Tech Solutions.

ABOUT LAXIMOTECH.AI:
- Online learning platform offering 40+ courses at ₹399 each
- Courses in AI, Python, Data Science, Machine Learning, Cybersecurity, Robotics, Web Development, IoT
- Hindi + English dual mode, verifiable digital certificates
- Based in Greater Noida West, UP, India. Physical centre available for demo classes.

ABOUT LAXIMO TECH SOLUTIONS:
- Full-service IT company: Web Design, App Development, Digital Marketing, AI Automation
- 8+ years experience, 150+ clients, 5 global markets
- Served: HCL Technologies, India TV, Aaj Tak, Salesforce, SpaceCart
- Rating: 4.9/5 from 150+ Google Reviews
- Contact: +91-8800236087, info@laximotechsolutions.com
- Address: F1, G-004, Amrapali Leisure Park, Techzone-4, Greater Noida West, UP

COURSES AT ₹399: AI for Absolute Beginners (20hrs), Python Foundation (40hrs), Machine Learning Fundamentals (40hrs), Data Science with Python (48hrs), Deep Learning & Neural Networks (48hrs), Generative AI & Prompt Engineering (24hrs), Cybersecurity Fundamentals (24hrs), Ethical Hacking (40hrs), Web Development Full Stack (60hrs), Robotics for Beginners (48hrs), Arduino & Microcontrollers (48hrs), IoT Internet of Things (40hrs), SQL for Data Analysts (24hrs), Excel for Data Analysis (15hrs).

CAREER PATHS (5 courses x Rs 399 = Rs 1995 total):
- AI/ML Engineer: Rs 12-80 LPA
- Data Analyst: Rs 4-25 LPA
- Full Stack Developer: Rs 5-35 LPA
- IoT/Robotics Engineer: Rs 5-40 LPA

FAQ:
- Certificate valid for jobs? Yes, unique verifiable ID, shareable on LinkedIn
- Prior coding needed? No, courses start from absolute zero, even for ages 6+
- Hindi available? Yes, all courses in Hindi + English with subtitles
- Rs 399 monthly or one-time? One-time payment, lifetime access including future updates
- Mobile access? Yes, fully mobile-optimized, Android app coming soon
- Free demo? Yes, free Robotics & AI demo class at Greater Noida West centre
- Refund policy? 30-day money back guarantee

Answer helpfully and concisely in a friendly tone. Keep responses under 120 words unless the user asks for details. Always be encouraging and helpful. If you don't know something specific, suggest contacting info@laximotechsolutions.com or calling +91-8800236087.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const conversationHistory = messages
      .map((m: any) => `${m.role === "user" ? "User" : "Laxi"}: ${m.content}`)
      .join("\n");

    const prompt = SYSTEM_PROMPT + "\n\nConversation so far:\n" + conversationHistory + "\n\nLaxi:";

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 200, temperature: 0.7 }
        })
      }
    );

    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
      || "Sorry, I couldn't process that. Please try again or contact us at info@laximotechsolutions.com";

    return NextResponse.json({ reply });

  } catch (error) {
    return NextResponse.json({
      reply: "Oops! Something went wrong. Please contact us at info@laximotechsolutions.com or call +91-8800236087"
    });
  }
}