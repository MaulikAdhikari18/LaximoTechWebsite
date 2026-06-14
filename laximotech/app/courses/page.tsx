"use client";
import { useEffect, useState } from "react";

const CATEGORIES = ["All", "Artificial Intelligence", "Data Science", "Programming", "Cybersecurity", "Robotics"];

export default function CoursesPage() {
    const [courses, setCourses] = useState<any[]>([]);
    const [filtered, setFiltered] = useState<any[]>([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) setUser(JSON.parse(stored));
    }, []);

    useEffect(() => {
        fetch("http://localhost:8080/api/courses")
            .then((res) => res.json())
            .then((data) => {
                setCourses(data);
                setFiltered(data);
            })
            .catch(() => setCourses([]));
    }, []);

    useEffect(() => {
        let result = courses;
        if (activeCategory !== "All") {
            result = result.filter((c) => c.category === activeCategory);
        }
        if (search.trim() !== "") {
            result = result.filter((c) =>
                c.title.toLowerCase().includes(search.toLowerCase())
            );
        }
        setFiltered(result);
    }, [activeCategory, search, courses]);

    return (
        <main>

            {/* NAVBAR */}
            <nav className="lx-nav">
                <a href="/" className="lx-logo">laximotech<span>.</span>ai</a>
                <div className="lx-navlinks">
                    <a href="/courses" style={{ color: '#FF6B00' }}>Courses</a>
                    <a href="/career-paths">Career Paths</a>
                    <a href="/blog">Blog</a>
                </div>
                {user ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <a href="/dashboard" style={{ color: '#ffffffcc', fontSize: '14px', textDecoration: 'none' }}>Dashboard</a>
                        <span style={{ color: '#fff', fontSize: '14px' }}>👋 {user.name}</span>
                        <button onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); setUser(null); }} style={{ background: 'transparent', border: '1px solid #ffffff55', color: '#fff', padding: '6px 14px', borderRadius: '16px', fontSize: '13px', cursor: 'pointer' }}>Logout</button>
                    </div>
                ) : (
                    <a href="/login" style={{ color: '#ffffffcc', fontSize: '15px', textDecoration: 'none' }}>Login</a>
                )}
                <a href="/courses"><button className="lx-btn-nav">Enroll Now</button></a>
            </nav>

            {/* PAGE HEADER */}
            <div style={{ background: '#1F4E79', padding: '60px', textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '42px', color: '#fff', marginBottom: '12px' }}>
                    All Courses
                </h1>
                <p style={{ fontSize: '18px', color: '#D0E8F5', marginBottom: '28px' }}>
                    40+ courses · All at ₹399 · Hindi + English
                </p>
                {/* SEARCH */}
                <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            width: '100%', padding: '14px 20px', borderRadius: '28px',
                            border: 'none', fontSize: '16px', outline: 'none',
                            paddingRight: '50px'
                        }}
                    />
                    <span style={{ position: 'absolute', right: '18px', top: '14px', fontSize: '18px' }}>🔍</span>
                </div>
            </div>

            {/* CATEGORY FILTERS */}
            <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '20px 60px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                            padding: '8px 20px', borderRadius: '20px', border: '2px solid',
                            fontWeight: 600, fontSize: '14px', cursor: 'pointer',
                            background: activeCategory === cat ? '#1F4E79' : '#fff',
                            color: activeCategory === cat ? '#fff' : '#1F4E79',
                            borderColor: '#1F4E79',
                            transition: 'all 0.2s'
                        }}
                    >
                        {cat}
                    </button>
                ))}
                <span style={{ marginLeft: 'auto', fontSize: '14px', color: '#888', alignSelf: 'center' }}>
                    {filtered.length} courses found
                </span>
            </div>

            {/* COURSES GRID */}
            <section style={{ padding: '50px 60px', background: '#F0F8FF', minHeight: '60vh' }}>
                {filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px', color: '#888' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                        <div style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '20px', color: '#1F4E79', marginBottom: '8px' }}>No courses found</div>
                        <div style={{ fontSize: '15px' }}>Try a different search or category</div>
                    </div>
                ) : (
                    <div className="lx-courses-grid">
                        {filtered.map((course: any, i: number) => (
                            <a href={`/courses/${course.slug}`} style={{ textDecoration: 'none', color: 'inherit' }} key={i}>
                                <div className="lx-course-card">
                                    <div className="lx-course-thumb">🎓</div>
                                    <span className="lx-course-badge">₹{course.price}</span>
                                    <div className="lx-course-body">
                                        <div style={{ fontSize: '11px', background: '#E6F1FB', color: '#1F4E79', padding: '3px 10px', borderRadius: '10px', display: 'inline-block', marginBottom: '8px', fontWeight: 600 }}>
                                            {course.category}
                                        </div>
                                        <div className="lx-course-title">{course.title}</div>
                                        <div className="lx-course-meta">{course.durationHours} hrs · {course.level} · {course.language}</div>
                                        <div className="lx-course-stars">
                                            ★★★★★ <span style={{ color: '#888' }}>{course.rating} ({course.totalStudents} students)</span>
                                        </div>
                                        <div className="lx-course-footer">
                                            <span className="lx-price">₹{course.price}</span>
                                            <button className="lx-enroll-btn">Enroll Now</button>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </section>

            {/* FOOTER */}
            <footer className="lx-footer">
                <div className="lx-footer-bottom" style={{ borderTop: 'none', paddingTop: '30px' }}>
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