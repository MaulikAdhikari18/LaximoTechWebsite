"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [courses, setCourses] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch(() => setCourses([]));
  }, []);

  return (
    <main>

      {/* NAVBAR */}
      <nav className="lx-nav">
        <div className="lx-logo">laximotech<span>.</span>ai</div>
        <div className="lx-navlinks">
          <a href="#">Courses</a>
          <a href="/career-paths">Career Paths</a>
          <a href="/blog">Blog</a>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <a href="/dashboard" style={{color:'#ffffffcc',fontSize:'14px',textDecoration:'none'}}>Dashboard</a>
              <span style={{ color: '#fff', fontSize: '14px' }}>👋 {user.name}</span>
              <button
                onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); setUser(null); }}
                style={{ background: 'transparent', border: '1px solid #ffffff55', color: '#fff', padding: '6px 14px', borderRadius: '16px', fontSize: '13px', cursor: 'pointer' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <a href="/login" style={{ color: '#ffffffcc', fontSize: '15px', textDecoration: 'none' }}>Login</a>
          )}
        </div>
        <a href="/courses"><button className="lx-btn-nav">Enroll Now</button></a>
      </nav>

      {/* HERO */}
      <section className="lx-hero">
        <div className="lx-hero-left">
          <h1>Master AI, Python &<br />Data Science<br /><span>For Just ₹399</span></h1>
          <p>Internationally Certified. 100% Online. Built for India.</p>
          <div className="lx-hero-btns">
            <button className="lx-btn-primary">Start Learning — ₹399</button>
            <button className="lx-btn-secondary">Watch Free Demo</button>
          </div>
          <div className="lx-stats">
            <div><div className="lx-stat-num">50,000+</div><div className="lx-stat-label">Learners</div></div>
            <div><div className="lx-stat-num">40+</div><div className="lx-stat-label">Courses</div></div>
            <div><div className="lx-stat-num">95%</div><div className="lx-stat-label">Completion Rate</div></div>
            <div><div className="lx-stat-num">500+</div><div className="lx-stat-label">Companies</div></div>
          </div>
        </div>
        <div className="lx-hero-right">
          <p>Hero Illustration</p>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="lx-trust">
        <span className="lx-trust-label">Our students work at:</span>
        <div className="lx-trust-logos">
          <span>TCS</span><span>Infosys</span><span>Wipro</span>
          <span>Zomato</span><span>Razorpay</span><span>Swiggy</span>
        </div>
      </div>

      {/* PROBLEM STATEMENT */}
      <section className="lx-problem">
        <h2>Other platforms charge ₹50,000 for the same course.</h2>
        <p>We built laximotech.ai so a student in Meerut has the same chance as one in Mumbai.</p>
        <strong>₹399. Real certificate. Real skills.</strong>
      </section>

      {/* FEATURED COURSES */}
      <section className="lx-section">
        <div className="lx-section-title">Featured Courses</div>
        <div className="lx-section-sub">Handpicked to get you job-ready, fast.</div>
        <div className="lx-courses-grid">
          {courses.length === 0 ? (
            <p style={{ color: '#888' }}>Loading courses...</p>
          ) : (
            courses.map((course: any, i: number) => (
              <div className="lx-course-card" key={i}>
                <div className="lx-course-thumb">🎓</div>
                <span className="lx-course-badge">₹{course.price}</span>
                <div className="lx-course-body">
                  <div className="lx-course-title">{course.title}</div>
                  <div className="lx-course-meta">{course.durationHours} hrs · {course.level} · {course.language}</div>
                  <div className="lx-course-stars">★★★★★ <span style={{ color: '#888' }}>{course.rating} ({course.totalStudents} students)</span></div>
                  <div className="lx-course-footer">
                    <span className="lx-price">₹{course.price}</span>
                    <button className="lx-enroll-btn">Enroll</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="lx-view-all">
          <button className="lx-btn-outline">View All 40+ Courses</button>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="lx-how">
        <div className="lx-section-title">How It Works</div>
        <div className="lx-section-sub">Go from zero to certified in 3 simple steps.</div>
        <div className="lx-steps">
          <div className="lx-step">
            <div className="lx-step-num">1</div>
            <h3>Choose Your Course</h3>
            <p>Browse 40+ courses across AI, Data Science, Web Dev, Robotics and more. All at ₹399.</p>
          </div>
          <div className="lx-step">
            <div className="lx-step-num">2</div>
            <h3>Learn at Your Pace</h3>
            <p>HD videos, quizzes, real projects, and a built-in code playground. Hindi or English.</p>
          </div>
          <div className="lx-step">
            <div className="lx-step-num">3</div>
            <h3>Get Certified & Hired</h3>
            <p>Download your verifiable certificate, share on LinkedIn, and land your dream job.</p>
          </div>
        </div>
      </section>

      {/* CAREER PATHS */}
      <section className="lx-section">
        <div className="lx-section-title">Career Paths</div>
        <div className="lx-section-sub">Follow a structured path — from beginner to job-ready.</div>
        <div className="lx-paths-grid">
          <div className="lx-path-card">
            <div className="lx-path-icon blue">🤖</div>
            <h3>AI / ML Engineer</h3>
            <div className="salary">₹12–80 LPA</div>
            <div className="courses-count">5 courses · ~54 weeks</div>
          </div>
          <div className="lx-path-card">
            <div className="lx-path-icon orange">📊</div>
            <h3>Data Analyst</h3>
            <div className="salary">₹4–25 LPA</div>
            <div className="courses-count">5 courses · ~29 weeks</div>
          </div>
          <div className="lx-path-card">
            <div className="lx-path-icon green">💻</div>
            <h3>Full Stack Developer</h3>
            <div className="salary">₹5–35 LPA</div>
            <div className="courses-count">5 courses · ~42 weeks</div>
          </div>
          <div className="lx-path-card">
            <div className="lx-path-icon purple">🔧</div>
            <h3>IoT / Robotics Engineer</h3>
            <div className="salary">₹5–40 LPA</div>
            <div className="courses-count">5 courses · ~42 weeks</div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="lx-testi">
        <div className="lx-section-title">Student Success Stories</div>
        <div className="lx-section-sub">Real students. Real results.</div>
        <div className="lx-testi-grid">
          <div className="lx-testi-card">
            <div className="lx-testi-quote">&ldquo;I completed the AI course for ₹399 and landed a job at a Bengaluru startup within 3 months. The certificate was verified on the spot.&rdquo;</div>
            <div className="lx-testi-author">
              <div className="lx-avatar">AK</div>
              <div><div className="lx-author-name">Ankit Kumar</div><div className="lx-author-city">Meerut, UP · AI Engineer</div></div>
            </div>
          </div>
          <div className="lx-testi-card">
            <div className="lx-testi-quote">&ldquo;Before laximotech.ai I could not afford any online course. The Python + Data Science path changed my career. Now I am a data analyst at MNC.&rdquo;</div>
            <div className="lx-testi-author">
              <div className="lx-avatar" style={{ background: '#117A65' }}>PS</div>
              <div><div className="lx-author-name">Priya Sharma</div><div className="lx-author-city">Lucknow, UP · Data Analyst</div></div>
            </div>
          </div>
          <div className="lx-testi-card">
            <div className="lx-testi-quote">&ldquo;My son started the Robotics course at age 9. He built his first robot at 10. The Hindi explanation makes it so easy. Best ₹399 I ever spent.&rdquo;</div>
            <div className="lx-testi-author">
              <div className="lx-avatar" style={{ background: '#FF6B00' }}>RM</div>
              <div><div className="lx-author-name">Ravi Mishra</div><div className="lx-author-city">Greater Noida · Parent</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO CTA */}
      <section className="lx-demo">
        <h2>Come Learn in Person — Free Demo Class</h2>
        <p>Greater Noida West students: Visit our centre for a FREE Robotics &amp; AI demo class.</p>
        <button className="lx-btn-white">Book Free Demo</button>
      </section>

      {/* FAQ */}
      <section className="lx-faq">
        <div className="lx-section-title" style={{ textAlign: 'center' }}>Frequently Asked Questions</div>
        <div className="lx-faq-list">
          {[
            { q: "Is the certificate valid for jobs?", a: "Yes. Every certificate has a unique verifiable ID that employers can check at laximotech.ai/verify. It is shareable on LinkedIn." },
            { q: "Do I need prior coding experience?", a: "No. We have courses starting from absolute zero — even for ages 6+. Each course clearly states its prerequisite." },
            { q: "Are the courses in Hindi?", a: "Yes. All courses are in both Hindi and English. Subtitles are available on every video." },
            { q: "Is ₹399 a monthly fee or one-time?", a: "One-time per course. Pay ₹399 once and get lifetime access including future updates." },
            { q: "Can I access courses on mobile?", a: "Yes. laximotech.ai is fully mobile-optimized. Android app is coming in late 2025." },
          ].map((item, i) => (
            <div className="lx-faq-item" key={i}>
              <div className="lx-faq-q">{item.q} <span>▾</span></div>
              <div className="lx-faq-a">{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lx-footer">
        <div className="lx-footer-grid">
          <div>
            <div className="lx-footer-brand">laximotech<span>.</span>ai</div>
            <div className="lx-footer-tagline">India&apos;s most affordable AI &amp; Tech learning platform. ₹399 per course. Real skills. Real certificates.</div>
            <div style={{ fontSize: '12px', color: '#666' }}>📍 Greater Noida West, UP, India</div>
          </div>
          <div>
            <h4>Courses</h4>
            <ul>
              <li><a href="#">AI &amp; Machine Learning</a></li>
              <li><a href="#">Data Science</a></li>
              <li><a href="#">Python</a></li>
              <li><a href="#">Web Development</a></li>
              <li><a href="#">Robotics &amp; IoT</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Instructors</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Verify Certificate</a></li>
              <li><a href="#">Refund Policy</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="lx-footer-bottom">
          <p>© 2025 laximotech.ai — Laximo Tech Solutions. All rights reserved.</p>
          <div className="lx-payment-badges">
            <span className="lx-pay-badge">UPI</span>
            <span className="lx-pay-badge">Razorpay</span>
            <span className="lx-pay-badge">Cards</span>
            <span className="lx-pay-badge">EMI</span>
          </div>
        </div>
      </footer>

    </main>
  );
}