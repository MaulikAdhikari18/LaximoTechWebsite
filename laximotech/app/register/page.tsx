"use client";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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

  const EyeIcon = ({ open }: { open: boolean }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {open ? (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </>
      ) : (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </>
      )}
    </svg>
  );

  const PasswordInput = ({ value, onChange, show, onToggle, placeholder, onKeyDown }: any) => (
    <div style={{position:'relative'}}>
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={{width:'100%',padding:'13px 48px 13px 16px',borderRadius:'10px',border:'1.5px solid #DDD',fontSize:'15px',outline:'none',boxSizing:'border-box'}}
        onFocus={(e) => e.target.style.borderColor='#1F4E79'}
        onBlur={(e) => e.target.style.borderColor='#DDD'}
      />
      <button
        type="button"
        onClick={onToggle}
        style={{position:'absolute',right:'14px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',padding:'0',display:'flex',alignItems:'center'}}
      >
        <EyeIcon open={show} />
      </button>
    </div>
  );

  return (
    <main style={{minHeight:'100vh',background:'#F0F8FF',display:'flex',flexDirection:'column'}}>
      <nav className="lx-nav">
        <a href="/" className="lx-logo">laximotech<span>.</span>ai</a>
        <div className="lx-navlinks">
          <a href="/courses">Courses</a>
          <a href="#">Career Paths</a>
          <a href="#">Blog</a>
        </div>
        <a href="/login"><button className="lx-btn-nav">Login</button></a>
      </nav>

      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'40px 20px'}}>
        <div style={{background:'#fff',borderRadius:'20px',padding:'48px',width:'100%',maxWidth:'440px',boxShadow:'0 4px 24px rgba(0,0,0,0.08)'}}>

          <div style={{textAlign:'center',marginBottom:'32px'}}>
            <div style={{fontFamily:'Poppins',fontWeight:700,fontSize:'24px',color:'#1F4E79'}}>
              laximotech<span style={{color:'#FF6B00'}}>.</span>ai
            </div>
            <h1 style={{fontFamily:'Poppins',fontWeight:700,fontSize:'26px',color:'#1A1A2E',marginTop:'16px',marginBottom:'8px'}}>
              Create your account
            </h1>
            <p style={{fontSize:'15px',color:'#888'}}>Start learning for just ₹399</p>
          </div>

          {error && (
            <div style={{background:'#FFF0F0',border:'1px solid #FFD0D0',borderRadius:'10px',padding:'12px 16px',marginBottom:'20px',color:'#CC0000',fontSize:'14px'}}>
              ⚠️ {error}
            </div>
          )}

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

          <div style={{marginBottom:'16px'}}>
            <label style={{display:'block',fontSize:'14px',fontWeight:600,color:'#333',marginBottom:'6px'}}>Password</label>
            <PasswordInput
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              show={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
              placeholder="Minimum 6 characters"
            />
          </div>

          <div style={{marginBottom:'24px'}}>
            <label style={{display:'block',fontSize:'14px',fontWeight:600,color:'#333',marginBottom:'6px'}}>Confirm Password</label>
            <PasswordInput
              value={confirm}
              onChange={(e: any) => setConfirm(e.target.value)}
              show={showConfirm}
              onToggle={() => setShowConfirm(!showConfirm)}
              placeholder="Re-enter your password"
              onKeyDown={(e: any) => e.key === 'Enter' && handleRegister()}
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            style={{width:'100%',background:'#FF6B00',color:'#fff',border:'none',padding:'15px',borderRadius:'10px',fontWeight:700,fontSize:'16px',cursor:loading?'not-allowed':'pointer',opacity:loading?0.7:1,marginBottom:'16px'}}
          >
            {loading ? "Creating account..." : "Create Free Account →"}
          </button>

          <div style={{background:'#F0F8FF',borderRadius:'10px',padding:'16px',marginBottom:'16px'}}>
            <div style={{fontSize:'13px',color:'#1F4E79',fontWeight:600,marginBottom:'8px'}}>What you get for free:</div>
            <div style={{fontSize:'13px',color:'#555',marginBottom:'4px'}}>✅ Access to free course previews</div>
            <div style={{fontSize:'13px',color:'#555',marginBottom:'4px'}}>✅ Course progress tracking</div>
            <div style={{fontSize:'13px',color:'#555'}}>✅ Community discussion access</div>
          </div>

          <div style={{textAlign:'center',color:'#888',fontSize:'14px'}}>
            Already have an account?{' '}
            <a href="/login" style={{color:'#1F4E79',fontWeight:700,textDecoration:'none'}}>Login here</a>
          </div>
        </div>
      </div>
    </main>
  );
}