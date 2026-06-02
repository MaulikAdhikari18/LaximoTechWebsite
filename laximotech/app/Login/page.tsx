"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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
        <a href="/register"><button className="lx-btn-nav">Register Free</button></a>
      </nav>

      {/* LOGIN CARD */}
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'40px 20px'}}>
        <div style={{background:'#fff',borderRadius:'20px',padding:'48px',width:'100%',maxWidth:'440px',boxShadow:'0 4px 24px rgba(0,0,0,0.08)'}}>

          {/* Logo */}
          <div style={{textAlign:'center',marginBottom:'32px'}}>
            <div style={{fontFamily:'Poppins',fontWeight:700,fontSize:'24px',color:'#1F4E79'}}>
              laximotech<span style={{color:'#FF6B00'}}>.</span>ai
            </div>
            <h1 style={{fontFamily:'Poppins',fontWeight:700,fontSize:'26px',color:'#1A1A2E',marginTop:'16px',marginBottom:'8px'}}>
              Welcome back!
            </h1>
            <p style={{fontSize:'15px',color:'#888'}}>Login to continue learning</p>
          </div>

          {/* Error */}
          {error && (
            <div style={{background:'#FFF0F0',border:'1px solid #FFD0D0',borderRadius:'10px',padding:'12px 16px',marginBottom:'20px',color:'#CC0000',fontSize:'14px'}}>
              ⚠️ {error}
            </div>
          )}

          {/* Email */}
          <div style={{marginBottom:'16px'}}>
            <label style={{display:'block',fontSize:'14px',fontWeight:600,color:'#333',marginBottom:'6px'}}>
              Email Address
            </label>
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
          <div style={{marginBottom:'24px'}}>
            <label style={{display:'block',fontSize:'14px',fontWeight:600,color:'#333',marginBottom:'6px'}}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              style={{width:'100%',padding:'13px 16px',borderRadius:'10px',border:'1.5px solid #DDD',fontSize:'15px',outline:'none',boxSizing:'border-box'}}
              onFocus={(e) => e.target.style.borderColor='#1F4E79'}
              onBlur={(e) => e.target.style.borderColor='#DDD'}
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{width:'100%',background:'#FF6B00',color:'#fff',border:'none',padding:'15px',borderRadius:'10px',fontWeight:700,fontSize:'16px',cursor:loading?'not-allowed':'pointer',opacity:loading?0.7:1,marginBottom:'16px'}}
          >
            {loading ? "Logging in..." : "Login →"}
          </button>

          {/* Divider */}
          <div style={{textAlign:'center',color:'#888',fontSize:'14px',marginBottom:'16px'}}>
            Don&apos;t have an account?{' '}
            <a href="/register" style={{color:'#1F4E79',fontWeight:700,textDecoration:'none'}}>Register Free</a>
          </div>

          {/* Trust */}
          <div style={{borderTop:'1px solid #EEE',paddingTop:'20px',textAlign:'center'}}>
            <div style={{fontSize:'12px',color:'#AAA'}}>🔒 Secure login · Your data is safe</div>
          </div>

        </div>
      </div>
    </main>
  );
}