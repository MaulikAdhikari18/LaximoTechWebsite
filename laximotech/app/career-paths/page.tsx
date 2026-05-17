"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const PATHS = [
  {
    title: "AI / ML Engineer",
    icon: "🤖",
    color: "#1F4E79",
    bg: "#E6F1FB",
    salary: "₹12 – 80 LPA",
    tagline: "The most in-demand role of the decade",
    steps: [
      { step: "Python Foundation", weeks: "8 weeks", desc: "Variables, loops, OOP, functions" },
      { step: "Data Science with Python", weeks: "10 weeks", desc: "Pandas, NumPy, visualisation, EDA" },
      { step: "Machine Learning Fundamentals", weeks: "12 weeks", desc: "Regression, classification, clustering" },
      { step: "Deep Learning & Neural Networks", weeks: "12 weeks", desc: "TensorFlow, CNNs, model deployment" },
      { step: "NLP or Computer Vision", weeks: "12 weeks", desc: "Pick your specialisation & build portfolio" },
    ]
  },
  {
    title: "Data Analyst",
    icon: "📊",
    color: "#FF6B00",
    bg: "#FFF0E6",
    salary: "₹4 – 25 LPA",
    tagline: "Entry-level friendly, huge demand in every industry",
    steps: [
      { step: "Excel for Data Analysis", weeks: "4 weeks", desc: "Pivot tables, VLOOKUP, dashboards" },
      { step: "SQL for Data Analysts", weeks: "6 weeks", desc: "Queries, joins, aggregations" },
      { step: "Statistics for Data Science", weeks: "5 weeks", desc: "Probability, hypothesis testing" },
      { step: "Python Foundation", weeks: "8 weeks", desc: "Pandas basics, data manipulation" },
      { step: "Data Visualisation — Tableau & Power BI", weeks: "6 weeks", desc: "Build professional dashboards" },
    ]
  },
  {
    title: "Full Stack Developer",
    icon: "💻",
    color: "#117A65",
    bg: "#E6F5EE",
    salary: "₹5 – 35 LPA",
    tagline: "Work from home, freelancing, startups",
    steps: [
      { step: "Web Development — Full Stack", weeks: "12 weeks", desc: "HTML, CSS, JavaScript, React, Node.js" },
      { step: "JavaScript & React", weeks: "10 weeks", desc: "Advanced React, state management" },
      { step: "Python Advanced (or Node APIs)", weeks: "10 weeks", desc: "REST APIs, database connections" },
      { step: "Cloud Computing — AWS Basics", weeks: "6 weeks", desc: "Deploy your apps live on the internet" },
      { step: "Generative AI & Prompt Engineering", weeks: "4 weeks", desc: "Add AI features to your web apps" },
    ]
  },
  {
    title: "IoT / Robotics Engineer",
    icon: "🔧",
    color: "#7C3AED",
    bg: "#EEEDFE",
    salary: "₹5 – 40 LPA",
    tagline: "Hardware + Software = rare & high value",
    steps: [
      { step: "Electronics & Circuit Design", weeks: "10 weeks", desc: "Circuits, sensors, breadboard" },
      { step: "Arduino & Microcontrollers", weeks: "10 weeks", desc: "Arduino programming, projects" },
      { step: "IoT — Internet of Things", weeks: "10 weeks", desc: "Cloud connectivity, smart devices" },
      { step: "Python Foundation", weeks: "8 weeks", desc: "Automate IoT with Python" },
      { step: "AI for Absolute Beginners", weeks: "4 weeks", desc: "AI on microcontrollers & edge devices" },
    ]
  },
];

export default function CareerPathsPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <main>
      {/* NAVBAR */}
      <nav className="lx-nav">
        <Link href="/" className="lx-logo">laximotech<span>.</span>ai</Link>
        <div className="lx-navlinks">
          <Link href="/courses">Courses</Link>
          <Link href="/career-paths" style={{color:'#FF6B00'}}>Career Paths</Link>
          <Link href="/blog">Blog</Link>
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

      {/* HEADER */}
      <div style={{background:'#1F4E79', padding:'60px', textAlign:'center'}}>
        <h1 style={{fontFamily:'Poppins',fontWeight:700,fontSize:'42px',color:'#fff',marginBottom:'12px'}}>
          Career Paths
        </h1>
        <p style={{fontSize:'18px',color:'#D0E8F5'}}>
          Follow a structured roadmap — from beginner to job-ready. 5 courses × ₹399 = ₹1,995 total.
        </p>
      </div>

      {/* PATHS */}
      <section style={{padding:'50px 60px', background:'#F0F8FF'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'24px', maxWidth:'1200px', margin:'0 auto'}}>
          {PATHS.map((path, i) => (
            <div key={i} style={{background:'#fff', borderRadius:'20px', padding:'28px', border:'1px solid #e0eaf3', boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>

              {/* Header */}
              <div style={{display:'flex', alignItems:'center', gap:'16px', marginBottom:'20px'}}>
                <div style={{width:'56px',height:'56px',borderRadius:'50%',background:path.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'26px',flexShrink:0}}>
                  {path.icon}
                </div>
                <div>
                  <div style={{fontFamily:'Poppins',fontWeight:700,fontSize:'20px',color:'#1A1A2E'}}>{path.title}</div>
                  <div style={{fontSize:'13px',color:path.color,fontWeight:700}}>{path.salary}</div>
                </div>
              </div>

              <p style={{fontSize:'13px',color:'#888',marginBottom:'20px'}}>{path.tagline}</p>

              {/* Steps */}
              <div>
                {path.steps.map((s, j) => (
                  <div key={j} style={{display:'flex',gap:'12px',marginBottom: j < path.steps.length - 1 ? '14px' : '0', position:'relative'}}>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                      <div style={{width:'28px',height:'28px',borderRadius:'50%',background:path.color,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:700,flexShrink:0}}>
                        {j+1}
                      </div>
                      {j < path.steps.length - 1 && (
                        <div style={{width:'2px',flex:1,background:'#eee',marginTop:'4px',minHeight:'24px'}}></div>
                      )}
                    </div>
                    <div style={{paddingBottom: j < path.steps.length - 1 ? '4px' : '0'}}>
                      <div style={{fontSize:'14px',fontWeight:700,color:'#1A1A2E'}}>{s.step}</div>
                      <div style={{fontSize:'12px',color:'#999',marginBottom:'2px'}}>{s.weeks} · ₹399</div>
                      <div style={{fontSize:'12px',color:'#777'}}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div style={{marginTop:'20px',paddingTop:'16px',borderTop:'1px solid #f0f0f0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div style={{fontSize:'12px',color:'#999'}}>Total investment</div>
                  <div style={{fontFamily:'Poppins',fontWeight:700,fontSize:'18px',color:path.color}}>₹1,995 <span style={{fontSize:'12px',color:'#999',fontWeight:400,textDecoration:'line-through'}}>₹1,00,000+</span></div>
                </div>
                <Link href="/courses">
                  <button style={{background:path.color,color:'#fff',border:'none',padding:'10px 22px',borderRadius:'20px',fontSize:'13px',fontWeight:700,cursor:'pointer'}}>
                    Start Path →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lx-footer">
        <div className="lx-footer-bottom" style={{borderTop:'none',paddingTop:'30px'}}>
          <p>© 2025 laximotech.ai — Laximo Tech Solutions. All rights reserved.</p>
          <div className="lx-payment-badges">
            <span className="lx-pay-badge">UPI</span>
            <span className="lx-pay-badge">Razorpay</span>
            <span className="lx-pay-badge">Cards</span>
          </div>
        </div>
      </footer>
    </main>
  );
}