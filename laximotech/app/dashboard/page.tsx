"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("courses");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (!stored || !token) { window.location.href = "/login"; return; }
    setUser(JSON.parse(stored));
    fetch("http://localhost:8080/api/enrollments/my-courses", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => { setEnrollments(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const getInitials = (name: string) => name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  };

  if (loading) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',background:'#F0F4FF',flexDirection:'column',gap:'16px'}}>
      <div style={{width:'48px',height:'48px',border:'4px solid #E0E7FF',borderTop:'4px solid #1F4E79',borderRadius:'50%',animation:'spin 0.8s linear infinite'}}></div>
      <div style={{fontFamily:'Poppins',fontSize:'16px',color:'#1F4E79',fontWeight:500}}>Loading your dashboard...</div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <div style={{minHeight:'100vh',background:'#F0F4FF',display:'flex',flexDirection:'column'}}>

      {/* NAVBAR */}
      <nav style={{background:'#1F4E79',padding:'0 40px',height:'68px',display:'flex',alignItems:'center',justifyContent:'space-between',boxShadow:'0 2px 12px rgba(31,78,121,0.3)',position:'sticky',top:0,zIndex:100}}>
        <a href="/" style={{fontFamily:'Poppins',fontWeight:700,fontSize:'20px',color:'#fff',textDecoration:'none'}}>
          laximotech<span style={{color:'#FF6B00'}}>.</span>ai
        </a>
        <div style={{display:'flex',alignItems:'center',gap:'24px'}}>
          <a href="/courses" style={{color:'rgba(255,255,255,0.8)',fontSize:'14px',textDecoration:'none'}}>Browse Courses</a>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <div style={{width:'36px',height:'36px',borderRadius:'50%',background:'#FF6B00',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:'14px'}}>
              {getInitials(user?.name)}
            </div>
            <span style={{color:'#fff',fontSize:'14px',fontWeight:500}}>{user?.name}</span>
          </div>
          <button onClick={handleLogout} style={{background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.3)',color:'#fff',padding:'7px 16px',borderRadius:'20px',fontSize:'13px',cursor:'pointer'}}>
            Logout
          </button>
        </div>
      </nav>

      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'32px 40px',width:'100%'}}>

        {/* WELCOME BANNER */}
        <div style={{background:'linear-gradient(135deg, #1F4E79 0%, #2E86AB 50%, #1F4E79 100%)',borderRadius:'24px',padding:'36px 44px',marginBottom:'28px',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:'-40px',right:'-40px',width:'200px',height:'200px',borderRadius:'50%',background:'rgba(255,255,255,0.05)'}}></div>
          <div style={{position:'absolute',bottom:'-60px',right:'100px',width:'150px',height:'150px',borderRadius:'50%',background:'rgba(255,107,0,0.1)'}}></div>
          <div style={{position:'relative',zIndex:1,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <div style={{fontSize:'14px',color:'rgba(255,255,255,0.7)',marginBottom:'6px',fontWeight:500}}>
                {getGreeting()} 👋
              </div>
              <h1 style={{fontFamily:'Poppins',fontWeight:700,fontSize:'32px',color:'#fff',marginBottom:'10px'}}>
                {user?.name}!
              </h1>
              <p style={{fontSize:'15px',color:'rgba(255,255,255,0.8)',marginBottom:'20px'}}>
                {enrollments.length > 0
                  ? `You have ${enrollments.length} course${enrollments.length > 1 ? 's' : ''} in progress. Keep going!`
                  : 'Start your learning journey today for just ₹399!'}
              </p>
              <a href="/courses">
                <button style={{background:'#FF6B00',color:'#fff',border:'none',padding:'11px 24px',borderRadius:'24px',fontWeight:700,fontSize:'14px',cursor:'pointer'}}>
                  {enrollments.length > 0 ? '+ Enroll in More Courses' : 'Browse Courses →'}
                </button>
              </a>
            </div>
            <div style={{textAlign:'center',flexShrink:0}}>
              <div style={{width:'100px',height:'100px',borderRadius:'50%',background:'rgba(255,255,255,0.15)',border:'3px solid rgba(255,255,255,0.3)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 8px',fontSize:'40px',fontFamily:'Poppins',fontWeight:700,color:'#fff'}}>
                {getInitials(user?.name)}
              </div>
              <div style={{fontSize:'12px',color:'rgba(255,255,255,0.7)'}}>Student</div>
            </div>
          </div>
        </div>

        {/* STATS CARDS */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px',marginBottom:'28px'}}>
          {[
            { icon:'📚', value: enrollments.length, label:'Courses Enrolled', color:'#1F4E79', bg:'#E6F1FB' },
            { icon:'⚡', value:'1', label:'Day Streak', color:'#FF6B00', bg:'#FFF0E6' },
            { icon:'🏆', value:'0', label:'Certificates', color:'#117A65', bg:'#E6F5EE' },
            { icon:'⭐', value:'₹399', label:'Per Course', color:'#7C3AED', bg:'#EEEDFE' },
          ].map((stat, i) => (
            <div key={i} style={{background:'#fff',borderRadius:'16px',padding:'22px 24px',border:'1px solid #E8ECF4',display:'flex',alignItems:'center',gap:'16px',boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
              <div style={{width:'50px',height:'50px',borderRadius:'14px',background:stat.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px',flexShrink:0}}>
                {stat.icon}
              </div>
              <div>
                <div style={{fontFamily:'Poppins',fontWeight:700,fontSize:'22px',color:stat.color}}>{stat.value}</div>
                <div style={{fontSize:'12px',color:'#888',marginTop:'2px'}}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div style={{display:'flex',gap:'4px',background:'#fff',borderRadius:'14px',padding:'5px',marginBottom:'24px',border:'1px solid #E8ECF4',width:'fit-content',boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
          {[
            { id:'courses', label:'My Courses', icon:'📚' },
            { id:'certificates', label:'Certificates', icon:'🏆' },
            { id:'profile', label:'My Profile', icon:'👤' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{padding:'9px 20px',borderRadius:'10px',border:'none',cursor:'pointer',fontSize:'14px',fontWeight:600,transition:'all 0.2s',
                background: activeTab === tab.id ? '#1F4E79' : 'transparent',
                color: activeTab === tab.id ? '#fff' : '#666'
              }}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* MY COURSES TAB */}
        {activeTab === 'courses' && (
          <div>
            {enrollments.length === 0 ? (
              <div style={{background:'#fff',borderRadius:'20px',padding:'64px',textAlign:'center',border:'1px solid #E8ECF4',boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
                <div style={{fontSize:'56px',marginBottom:'16px'}}>📚</div>
                <div style={{fontFamily:'Poppins',fontWeight:700,fontSize:'22px',color:'#1F4E79',marginBottom:'8px'}}>No courses yet!</div>
                <div style={{fontSize:'15px',color:'#888',marginBottom:'28px',maxWidth:'360px',margin:'0 auto 28px'}}>Start your learning journey today. All courses at just ₹399.</div>
                <a href="/courses">
                  <button style={{background:'#FF6B00',color:'#fff',border:'none',padding:'14px 36px',borderRadius:'28px',fontWeight:700,fontSize:'15px',cursor:'pointer'}}>
                    Browse All Courses →
                  </button>
                </a>
              </div>
            ) : (
              <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'20px'}}>
                {enrollments.map((enrollment: any, i: number) => (
                  <div key={i} style={{background:'#fff',borderRadius:'20px',padding:'24px',border:'1px solid #E8ECF4',boxShadow:'0 2px 8px rgba(0,0,0,0.04)',transition:'box-shadow 0.2s'}}>
                    <div style={{display:'flex',gap:'16px',alignItems:'flex-start',marginBottom:'16px'}}>
                      <div style={{width:'64px',height:'64px',background:'linear-gradient(135deg,#1F4E79,#2E86AB)',borderRadius:'16px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0}}>
                        🎓
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontFamily:'Poppins',fontWeight:700,fontSize:'16px',color:'#1A1A2E',marginBottom:'4px'}}>
                          {enrollment.course?.title}
                        </div>
                        <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                          <span style={{fontSize:'12px',background:'#E6F1FB',color:'#1F4E79',padding:'2px 10px',borderRadius:'10px',fontWeight:600}}>
                            {enrollment.course?.category}
                          </span>
                          <span style={{fontSize:'12px',background:'#F0F8FF',color:'#555',padding:'2px 10px',borderRadius:'10px'}}>
                            {enrollment.course?.level}
                          </span>
                          <span style={{fontSize:'12px',background:'#F0F8FF',color:'#555',padding:'2px 10px',borderRadius:'10px'}}>
                            {enrollment.course?.durationHours} hrs
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress */}
                    <div style={{marginBottom:'16px'}}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
                        <span style={{fontSize:'13px',color:'#888',fontWeight:500}}>Progress</span>
                        <span style={{fontSize:'13px',fontWeight:700,color:'#1F4E79'}}>{enrollment.progressPercent || 0}%</span>
                      </div>
                      <div style={{background:'#F0F4FF',borderRadius:'8px',height:'8px',overflow:'hidden'}}>
                        <div style={{background:'linear-gradient(90deg,#1F4E79,#2E86AB)',borderRadius:'8px',height:'8px',width:`${enrollment.progressPercent || 0}%`,transition:'width 0.5s'}}></div>
                      </div>
                    </div>

                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <div style={{fontSize:'12px',color:'#AAA'}}>
                        📅 Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}
                      </div>
                      <a href={`/courses/${enrollment.course?.slug}`}>
                        <button style={{background:'#1F4E79',color:'#fff',border:'none',padding:'8px 18px',borderRadius:'20px',fontSize:'13px',fontWeight:700,cursor:'pointer'}}>
                          Continue →
                        </button>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CERTIFICATES TAB */}
        {activeTab === 'certificates' && (
          <div style={{background:'#fff',borderRadius:'20px',padding:'64px',textAlign:'center',border:'1px solid #E8ECF4',boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
            <div style={{fontSize:'56px',marginBottom:'16px'}}>🏆</div>
            <div style={{fontFamily:'Poppins',fontWeight:700,fontSize:'22px',color:'#1F4E79',marginBottom:'8px'}}>No certificates yet</div>
            <div style={{fontSize:'15px',color:'#888',marginBottom:'8px'}}>Complete a course to earn your verified certificate.</div>
            <div style={{fontSize:'14px',color:'#AAA'}}>Certificates are shareable on LinkedIn and verifiable by employers.</div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div style={{background:'#fff',borderRadius:'20px',padding:'36px',border:'1px solid #E8ECF4',boxShadow:'0 2px 8px rgba(0,0,0,0.04)',maxWidth:'500px'}}>
            <h2 style={{fontFamily:'Poppins',fontWeight:700,fontSize:'20px',color:'#1F4E79',marginBottom:'28px'}}>My Profile</h2>
            <div style={{display:'flex',alignItems:'center',gap:'20px',marginBottom:'28px',padding:'20px',background:'#F0F4FF',borderRadius:'16px'}}>
              <div style={{width:'72px',height:'72px',borderRadius:'50%',background:'#1F4E79',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontFamily:'Poppins',fontWeight:700,fontSize:'28px'}}>
                {getInitials(user?.name)}
              </div>
              <div>
                <div style={{fontFamily:'Poppins',fontWeight:700,fontSize:'20px',color:'#1A1A2E'}}>{user?.name}</div>
                <div style={{fontSize:'14px',color:'#888',marginTop:'4px'}}>Student · laximotech.ai</div>
              </div>
            </div>
            {[
              { label:'Full Name', value: user?.name, icon:'👤' },
              { label:'Email Address', value: user?.email, icon:'✉️' },
              { label:'Account Type', value: user?.role || 'STUDENT', icon:'🎓' },
              { label:'Courses Enrolled', value: `${enrollments.length} course${enrollments.length !== 1 ? 's' : ''}`, icon:'📚' },
            ].map((field, i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:'14px',padding:'14px 0',borderBottom: i < 3 ? '1px solid #F0F4FF' : 'none'}}>
                <span style={{fontSize:'20px',width:'28px',textAlign:'center'}}>{field.icon}</span>
                <div>
                  <div style={{fontSize:'12px',color:'#AAA',marginBottom:'2px'}}>{field.label}</div>
                  <div style={{fontSize:'15px',fontWeight:600,color:'#1A1A2E'}}>{field.value}</div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}