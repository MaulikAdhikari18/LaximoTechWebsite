"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'Poppins',fontSize:'18px',color:'#1F4E79'}}>
      Loading dashboard...
    </div>
  );

  return (
    <main style={{minHeight:'100vh',background:'#F0F8FF'}}>

      {/* NAVBAR */}
      <nav className="lx-nav">
        <a href="/" className="lx-logo">laximotech<span>.</span>ai</a>
        <div className="lx-navlinks">
          <a href="/courses">Courses</a>
          <a href="#">Career Paths</a>
          <a href="#">Blog</a>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <span style={{color:'#fff',fontSize:'14px'}}>👋 {user?.name}</span>
          <button onClick={handleLogout} style={{background:'transparent',border:'1px solid #ffffff55',color:'#fff',padding:'6px 14px',borderRadius:'16px',fontSize:'13px',cursor:'pointer'}}>
            Logout
          </button>
        </div>
      </nav>

      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'40px 60px'}}>

        {/* WELCOME HEADER */}
        <div style={{background:'#1F4E79',borderRadius:'20px',padding:'36px 40px',marginBottom:'32px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <div style={{fontSize:'14px',color:'#D0E8F5',marginBottom:'8px'}}>Welcome back,</div>
            <h1 style={{fontFamily:'Poppins',fontWeight:700,fontSize:'32px',color:'#fff',marginBottom:'8px'}}>
              {user?.name} 👋
            </h1>
            <div style={{fontSize:'15px',color:'#D0E8F5'}}>
              {enrollments.length} course{enrollments.length !== 1 ? 's' : ''} enrolled · Keep learning!
            </div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{background:'#FF6B00',borderRadius:'16px',padding:'20px 28px',textAlign:'center'}}>
              <div style={{fontFamily:'Poppins',fontWeight:700,fontSize:'36px',color:'#fff'}}>{enrollments.length}</div>
              <div style={{fontSize:'13px',color:'#fff',opacity:0.9}}>Courses Enrolled</div>
            </div>
          </div>
        </div>

        {/* STATS ROW */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px',marginBottom:'32px'}}>
          <div style={{background:'#fff',borderRadius:'16px',padding:'24px',border:'1px solid #e0eaf3',textAlign:'center'}}>
            <div style={{fontSize:'32px',marginBottom:'8px'}}>📚</div>
            <div style={{fontFamily:'Poppins',fontWeight:700,fontSize:'24px',color:'#1F4E79'}}>{enrollments.length}</div>
            <div style={{fontSize:'14px',color:'#888'}}>Courses Enrolled</div>
          </div>
          <div style={{background:'#fff',borderRadius:'16px',padding:'24px',border:'1px solid #e0eaf3',textAlign:'center'}}>
            <div style={{fontSize:'32px',marginBottom:'8px'}}>🏆</div>
            <div style={{fontFamily:'Poppins',fontWeight:700,fontSize:'24px',color:'#117A65'}}>0</div>
            <div style={{fontSize:'14px',color:'#888'}}>Certificates Earned</div>
          </div>
          <div style={{background:'#fff',borderRadius:'16px',padding:'24px',border:'1px solid #e0eaf3',textAlign:'center'}}>
            <div style={{fontSize:'32px',marginBottom:'8px'}}>⚡</div>
            <div style={{fontFamily:'Poppins',fontWeight:700,fontSize:'24px',color:'#FF6B00'}}>1</div>
            <div style={{fontSize:'14px',color:'#888'}}>Day Streak</div>
          </div>
        </div>

        {/* MY COURSES */}
        <div style={{marginBottom:'32px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
            <h2 style={{fontFamily:'Poppins',fontWeight:700,fontSize:'24px',color:'#1F4E79'}}>My Courses</h2>
            <a href="/courses" style={{color:'#FF6B00',fontWeight:600,fontSize:'14px',textDecoration:'none'}}>+ Enroll in more courses</a>
          </div>

          {enrollments.length === 0 ? (
            <div style={{background:'#fff',borderRadius:'16px',padding:'60px',textAlign:'center',border:'1px solid #e0eaf3'}}>
              <div style={{fontSize:'48px',marginBottom:'16px'}}>📚</div>
              <div style={{fontFamily:'Poppins',fontWeight:600,fontSize:'20px',color:'#1F4E79',marginBottom:'8px'}}>No courses yet</div>
              <div style={{fontSize:'15px',color:'#888',marginBottom:'24px'}}>Start learning today for just ₹399</div>
              <a href="/courses">
                <button style={{background:'#FF6B00',color:'#fff',border:'none',padding:'14px 32px',borderRadius:'28px',fontWeight:700,fontSize:'15px',cursor:'pointer'}}>
                  Browse Courses
                </button>
              </a>
            </div>
          ) : (
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'20px'}}>
              {enrollments.map((enrollment: any, i: number) => (
                <div key={i} style={{background:'#fff',borderRadius:'16px',padding:'24px',border:'1px solid #e0eaf3',display:'flex',gap:'20px',alignItems:'flex-start'}}>
                  {/* Course thumb */}
                  <div style={{width:'80px',height:'80px',background:'#D0E8F5',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'32px',flexShrink:0}}>
                    🎓
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:'Poppins',fontWeight:600,fontSize:'16px',color:'#1A1A2E',marginBottom:'4px'}}>
                      {enrollment.course?.title}
                    </div>
                    <div style={{fontSize:'13px',color:'#888',marginBottom:'12px'}}>
                      {enrollment.course?.category} · {enrollment.course?.level} · {enrollment.course?.durationHours} hrs
                    </div>
                    {/* Progress bar */}
                    <div style={{marginBottom:'10px'}}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
                        <span style={{fontSize:'12px',color:'#888'}}>Progress</span>
                        <span style={{fontSize:'12px',fontWeight:600,color:'#1F4E79'}}>{enrollment.progressPercent || 0}%</span>
                      </div>
                      <div style={{background:'#E8E8E8',borderRadius:'4px',height:'6px'}}>
                        <div style={{background:'#117A65',borderRadius:'4px',height:'6px',width:`${enrollment.progressPercent || 0}%`}}></div>
                      </div>
                    </div>
                    <div style={{display:'flex',gap:'8px'}}>
                      <a href={`/courses/${enrollment.course?.slug}`}>
                        <button style={{background:'#1F4E79',color:'#fff',border:'none',padding:'8px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:600,cursor:'pointer'}}>
                          Continue Learning
                        </button>
                      </a>
                      <div style={{fontSize:'12px',color:'#888',alignSelf:'center'}}>
                        Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString('en-IN', {day:'numeric',month:'short',year:'numeric'})}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RECOMMENDED COURSES */}
        <div>
          <h2 style={{fontFamily:'Poppins',fontWeight:700,fontSize:'24px',color:'#1F4E79',marginBottom:'20px'}}>
            Recommended For You
          </h2>
          <div style={{background:'#fff',borderRadius:'16px',padding:'28px',border:'1px solid #e0eaf3',textAlign:'center'}}>
            <div style={{fontSize:'15px',color:'#888',marginBottom:'16px'}}>Explore our full course catalogue</div>
            <a href="/courses">
              <button style={{background:'#FF6B00',color:'#fff',border:'none',padding:'12px 28px',borderRadius:'24px',fontWeight:700,fontSize:'14px',cursor:'pointer'}}>
                View All Courses →
              </button>
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}