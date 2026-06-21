"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const POSTS = [
  { title: "Top 10 AI Skills to Learn in 2025 That Will Get You Hired", excerpt: "From prompt engineering to LangChain — here are the exact skills recruiters are searching for right now, and how to learn them for ₹399.", category: "Career", readTime: "6 min read", date: "May 28, 2026", icon: "🤖", color: "#1F4E79", bg: "#E6F1FB" },
  { title: "How I Built a Machine Learning Project in 30 Days for Free", excerpt: "A student's journey from zero coding experience to deploying a real ML model — using only free tools and the Machine Learning Fundamentals course.", category: "Success Story", readTime: "5 min read", date: "May 22, 2026", icon: "🚀", color: "#117A65", bg: "#E6F5EE" },
  { title: "Best Data Science Courses Under ₹500 in India — 2026 Review", excerpt: "We compared 12 platforms. Spoiler: most charge ₹5,000–50,000 for the same content. Here's why ₹399 isn't a compromise.", category: "Reviews", readTime: "8 min read", date: "May 15, 2026", icon: "📊", color: "#FF6B00", bg: "#FFF0E6" },
  { title: "Python vs R for Data Science — Which Should You Learn?", excerpt: "Both are powerful, but for Indian job markets in 2026, one clearly has the edge. We break down salaries, job postings, and learning curve.", category: "Guide", readTime: "7 min read", date: "May 8, 2026", icon: "🐍", color: "#7C3AED", bg: "#EEEDFE" },
  { title: "How to Get a Job in AI With No Prior Experience", excerpt: "Real strategies from students who landed AI roles at startups and MNCs — without a CS degree. Includes resume templates and interview tips.", category: "Career", readTime: "9 min read", date: "Apr 30, 2026", icon: "💼", color: "#1F4E79", bg: "#E6F1FB" },
  { title: "Step-by-Step: How to Become a Data Analyst in India in 6 Months", excerpt: "The exact 5-course roadmap (Excel → SQL → Statistics → Python → Power BI) that takes you from beginner to job-ready.", category: "Roadmap", readTime: "6 min read", date: "Apr 22, 2026", icon: "🗺️", color: "#117A65", bg: "#E6F5EE" },
  { title: "Arduino Projects for Beginners — 10 Projects to Build This Weekend", excerpt: "From a simple LED blinker to a smart home alarm system — hands-on projects that make hardware fun, with parts lists and code.", category: "Robotics", readTime: "10 min read", date: "Apr 14, 2026", icon: "🔧", color: "#7C3AED", bg: "#EEEDFE" },
  { title: "Free vs Paid Courses: Is a ₹399 Certificate Worth It?", excerpt: "We asked HR managers at 20 companies whether they check certificates — and what actually matters when hiring freshers.", category: "Guide", readTime: "5 min read", date: "Apr 5, 2026", icon: "🎓", color: "#FF6B00", bg: "#FFF0E6" },
];

const CATEGORIES = ["All", "Career", "Success Story", "Reviews", "Guide", "Roadmap", "Robotics"];

export default function BlogPage() {
  const [user, setUser] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  useScrollAnimation();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const filtered = activeCategory === "All" ? POSTS : POSTS.filter(p => p.category === activeCategory);

  return (
    <main>
      <nav className="lx-nav">
        <Link href="/" className="lx-logo">laximotech<span>.</span>ai</Link>
        <div className="lx-navlinks">
          <Link href="/courses">Courses</Link>
          <Link href="/career-paths">Career Paths</Link>
          <Link href="/blog" style={{color:'#FF6B00'}}>Blog</Link>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
          {user ? (
            <>
              <Link href="/dashboard" style={{color:'#ffffffcc',fontSize:'14px',textDecoration:'none'}}>Dashboard</Link>
              <span style={{color:'#fff',fontSize:'14px'}}>👋 {user.name}</span>
              <button onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); setUser(null); }} style={{background:'transparent',border:'1px solid #ffffff55',color:'#fff',padding:'6px 14px',borderRadius:'16px',fontSize:'13px',cursor:'pointer'}}>Logout</button>
            </>
          ) : (
            <Link href="/login" style={{color:'#ffffffcc',fontSize:'15px',textDecoration:'none'}}>Login</Link>
          )}
          <Link href="/courses"><button className="lx-btn-nav">Enroll Now</button></Link>
        </div>
      </nav>

      <div className="lx-page-header" style={{background:'#1F4E79', padding:'60px', textAlign:'center'}}>
        <h1 style={{fontFamily:'Poppins',fontWeight:700,fontSize:'42px',color:'#fff',marginBottom:'12px'}}>Blog & Resources</h1>
        <p style={{fontSize:'18px',color:'#D0E8F5'}}>Career tips, success stories, and roadmaps to help you learn smarter.</p>
      </div>

      <div className="lx-animate" style={{background:'#fff',borderBottom:'1px solid #eee',padding:'20px 60px',display:'flex',gap:'12px',flexWrap:'wrap'}}>
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            style={{ padding:'8px 20px',borderRadius:'20px',border:'2px solid',fontWeight:600,fontSize:'14px',cursor:'pointer',
              background: activeCategory === cat ? '#1F4E79' : '#fff', color: activeCategory === cat ? '#fff' : '#1F4E79', borderColor:'#1F4E79' }}>
            {cat}
          </button>
        ))}
        <span style={{marginLeft:'auto',fontSize:'14px',color:'#888',alignSelf:'center'}}>{filtered.length} articles</span>
      </div>

      <section style={{padding:'50px 60px',background:'#F0F8FF',minHeight:'60vh'}}>
        <div className="lx-stagger" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'24px',maxWidth:'1200px',margin:'0 auto'}}>
          {filtered.map((post, i) => (
            <div key={i} style={{background:'#fff',borderRadius:'16px',overflow:'hidden',border:'1px solid #e8e8e8',cursor:'pointer',
              transition:'transform 0.25s ease, box-shadow 0.25s ease'}}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-5px)'; (e.currentTarget as HTMLElement).style.boxShadow='0 12px 28px rgba(0,0,0,0.10)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform='translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow='none'; }}>
              <div style={{background:post.bg, height:'140px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'48px'}}>{post.icon}</div>
              <div style={{padding:'20px'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
                  <span style={{fontSize:'11px',fontWeight:700,color:post.color,background:post.bg,padding:'3px 10px',borderRadius:'10px'}}>{post.category}</span>
                  <span style={{fontSize:'12px',color:'#aaa'}}>{post.readTime}</span>
                </div>
                <div style={{fontFamily:'Poppins',fontWeight:700,fontSize:'16px',color:'#1A1A2E',marginBottom:'8px',lineHeight:'1.4'}}>{post.title}</div>
                <p style={{fontSize:'13px',color:'#888',lineHeight:'1.6',marginBottom:'12px'}}>{post.excerpt}</p>
                <div style={{fontSize:'12px',color:'#aaa'}}>📅 {post.date}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="lx-animate" style={{background:'#FF6B00',padding:'50px 60px',textAlign:'center'}}>
        <h2 style={{fontFamily:'Poppins',fontWeight:700,fontSize:'28px',color:'#fff',marginBottom:'8px'}}>Never miss a career tip</h2>
        <p style={{fontSize:'15px',color:'#fff',opacity:0.9,marginBottom:'24px'}}>Get new articles, course updates, and free demo invites straight to your inbox.</p>
        <div style={{display:'flex',gap:'10px',justifyContent:'center',maxWidth:'420px',margin:'0 auto'}}>
          <input type="email" placeholder="you@example.com" style={{flex:1,padding:'13px 18px',borderRadius:'28px',border:'none',fontSize:'14px',outline:'none'}}/>
          <button style={{background:'#1F4E79',color:'#fff',border:'none',padding:'13px 28px',borderRadius:'28px',fontWeight:700,fontSize:'14px',cursor:'pointer'}}>Subscribe</button>
        </div>
      </section>

      <footer className="lx-footer">
        <div className="lx-footer-bottom" style={{borderTop:'none',paddingTop:'30px'}}>
          <p>© 2025 laximotech.ai — Laximo Tech Solutions. All rights reserved.</p>
          <div className="lx-payment-badges"><span className="lx-pay-badge">UPI</span><span className="lx-pay-badge">Razorpay</span><span className="lx-pay-badge">Cards</span></div>
        </div>
      </footer>
    </main>
  );
}