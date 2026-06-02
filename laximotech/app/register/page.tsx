"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");
    if (!name || !email || !password) { setError("All fields are required."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data); setLoading(false); return; }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ name: data.name, email: data.email, role: data.role }));
      window.location.href = "/";
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main style={{minHeight:'100vh',background:'#F0F8FF',display:'flex',flexDirection:'column'}}>

      {/* NAVBAR */}
      <nav className="lx-nav">
        <a href="/" className="lx-logo">laximotech<span>.</span>ai</a>
        <div className="lx-navlinks">
          <a href="/courses">Courses</a>
          <a href="#">Career Paths</a>
          <a href="#">Blog</a>
        </div>
        <a href="/login"><button className="lx-btn-nav">Login</button></a>
      </nav>

      {/* REGISTER CARD */}
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'40px 20px'}}>
        <div style={{background:'#fff',borderRadius:'20px',padding:'48px',width:'100%',maxWidth:'440px',boxShadow:'0 4px 24px rgba(0,0,0,0.08)'}}>

          {/* Logo */}
          <div style={{textAlign:'center',marginBottom:'32px'}}>
            <div style={{fontFamily:'Poppins',fontWeight:700,fontSize:'24px',color:'#1F4E79'}}>
              laximotech<span style={{color:'#FF6B00'}}>.</span>ai
            </div>
            <h1 style={{fontFamily:'Poppins',fontWeight:700,fontSize:'26px',color:'#1A1A2E',marginTop:'16px',marginBottom:'8px'}}>
              Create your account
            </h1>
            <p style={{fontSize:'15px',color:'#888'}}>Start learning for just ₹399</p>
          </div>

          {/* Error */}
          {error && (
            <div style={{background:'#FFF0F0',border:'1px solid #FFD0D0',borderRadius:'10px',padding:'12px 16px',marginBottom:'20px',color:'#CC0000',fontSize:'14px'}}>
              ⚠️ {error}
            </div>
          )}

          {/* Name */}
          <div style={{marginBottom:'16px'}}>
            <label style={{display:'block',fontSize:'14px',fontWeight:600,color:'#333',marginBottom:'6px'}}>Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{width:'100%',padding:'13px 16px',borderRadius:'10px',border:'1.5px solid #DDD',fontSize:'15px',outline:'none',boxSizing:'border-box'}}
              onFocus={(e) => e.target.style.borderColor='#1F4E79'}
              onBlur={(e) => e.target.style.borderColor='#DDD'}
            />
          </div>

          {/* Email */}
          <div style={{marginBottom:'16px'}}>
            <label style={{display:'block',fontSize:'14px',fontWeight:600,color:'#333',marginBottom:'6px'}}>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{width:'100%',padding:'13px 16px',borderRadius:'10px',border:'1.5px solid #DDD',fontSize:'15px',outline:'none',boxSizing:'border-box'}}
              onFocus={(e) => e.target.style.borderColor='#1F4E79'}
              onBlur={(e) => e.target.style.borderColor='#DDD'}
            />
          </div>

          {/* Password */}
          <div style={{marginBottom:'16px'}}>
            <label style={{display:'block',fontSize:'14px',fontWeight:600,color:'#333',marginBottom:'6px'}}>Password</label>
            <input
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{width:'100%',padding:'13px 16px',borderRadius:'10px',border:'1.5px solid #DDD',fontSize:'15px',outline:'none',boxSizing:'border-box'}}
              onFocus={(e) => e.target.style.borderColor='#1F4E79'}
              onBlur={(e) => e.target.style.borderColor='#DDD'}
            />
          </div>

          {/* Confirm Password */}
          <div style={{marginBottom:'24px'}}>
            <label style={{display:'block',fontSize:'14px',fontWeight:600,color:'#333',marginBottom:'6px'}}>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
              style={{width:'100%',padding:'13px 16px',borderRadius:'10px',border:'1.5px solid #DDD',fontSize:'15px',outline:'none',boxSizing:'border-box'}}
              onFocus={(e) => e.target.style.borderColor='#1F4E79'}
              onBlur={(e) => e.target.style.borderColor='#DDD'}
            />
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            disabled={loading}
            style={{width:'100%',background:'#FF6B00',color:'#fff',border:'none',padding:'15px',borderRadius:'10px',fontWeight:700,fontSize:'16px',cursor:loading?'not-allowed':'pointer',opacity:loading?0.7:1,marginBottom:'16px'}}
          >
            {loading ? "Creating account..." : "Create Free Account →"}
          </button>

          {/* Benefits */}
          <div style={{background:'#F0F8FF',borderRadius:'10px',padding:'16px',marginBottom:'16px'}}>
            <div style={{fontSize:'13px',color:'#1F4E79',fontWeight:600,marginBottom:'8px'}}>What you get for free:</div>
            <div style={{fontSize:'13px',color:'#555',marginBottom:'4px'}}>✅ Access to free course previews</div>
            <div style={{fontSize:'13px',color:'#555',marginBottom:'4px'}}>✅ Course progress tracking</div>
            <div style={{fontSize:'13px',color:'#555'}}>✅ Community discussion access</div>
          </div>

          {/* Login link */}
          <div style={{textAlign:'center',color:'#888',fontSize:'14px'}}>
            Already have an account?{' '}
            <a href="/login" style={{color:'#1F4E79',fontWeight:700,textDecoration:'none'}}>Login here</a>
          </div>

        </div>
      </div>
    </main>
  );
}