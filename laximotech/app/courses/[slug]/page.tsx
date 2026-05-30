"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CourseDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [enrolled, setEnrolled] = useState(false);
    const [enrolling, setEnrolling] = useState(false);
    const [enrollMsg, setEnrollMsg] = useState("");

    useEffect(() => {
        if (!slug) return;
        fetch(`http://localhost:8080/api/courses/slug/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                setCourse(data);
                setLoading(false);
                const token = localStorage.getItem("token");
                if (token && data?.id) {
                    fetch(`http://localhost:8080/api/enrollments/check/${data.id}`, {
                        headers: { "Authorization": `Bearer ${token}` }
                    })
                        .then(r => r.json())
                        .then(d => setEnrolled(d.enrolled))
                        .catch(() => { });
                }
            })
            .catch(() => setLoading(false));
    }, [slug]);

    if (loading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Poppins', fontSize: '18px', color: '#1F4E79' }}>
            Loading course...
        </div>
    );

    if (!course) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Poppins', fontSize: '18px', color: '#888' }}>
            Course not found.
        </div>
    );

    const handleEnroll = async () => {
        const token = localStorage.getItem("token");
        if (!token) { window.location.href = "/login"; return; }
        setEnrolling(true);
        try {
            const res = await fetch(`http://localhost:8080/api/enrollments/enroll/${course.id}`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) { setEnrolled(true); setEnrollMsg("🎉 Enrolled successfully!"); }
            else { setEnrollMsg(data); }
        } catch { setEnrollMsg("Something went wrong."); }
        setEnrolling(false);
    };

    const syllabus = [
        { section: "Section 1", title: "Getting Started", lessons: 4 },
        { section: "Section 2", title: "Core Concepts", lessons: 6 },
        { section: "Section 3", title: "Hands-on Practice", lessons: 5 },
        { section: "Section 4", title: "Real Project", lessons: 4 },
        { section: "Section 5", title: "Final Assessment & Certificate", lessons: 2 },
    ];

    return (
        <main>

            {/* NAVBAR */}
            <nav className="lx-nav">
                <a href="/" className="lx-logo">laximotech<span>.</span>ai</a>
                <div className="lx-navlinks">
                    <a href="/courses" style={{ color: '#FF6B00' }}>Courses</a>
                    <a href="#">Career Paths</a>
                    <a href="#">Blog</a>
                    <a href="#">Login</a>
                </div>
                <button className="lx-btn-nav">Enroll Now</button>
            </nav>

            {/* COURSE HERO */}
            <div style={{ background: '#1F4E79', padding: '60px', display: 'flex', gap: '60px', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                    {/* Breadcrumb */}
                    <div style={{ fontSize: '13px', color: '#D0E8F5', marginBottom: '16px' }}>
                        <a href="/" style={{ color: '#D0E8F5', textDecoration: 'none' }}>Home</a>
                        {' › '}
                        <a href="/courses" style={{ color: '#D0E8F5', textDecoration: 'none' }}>Courses</a>
                        {' › '}
                        <span style={{ color: '#fff' }}>{course.title}</span>
                    </div>

                    {/* Category badge */}
                    <div style={{ display: 'inline-block', background: '#FF6B00', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '4px 12px', borderRadius: '12px', marginBottom: '16px' }}>
                        {course.category}
                    </div>

                    {/* Title */}
                    <h1 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '40px', color: '#fff', lineHeight: 1.2, marginBottom: '16px' }}>
                        {course.title}
                    </h1>

                    {/* Description */}
                    <p style={{ fontSize: '17px', color: '#D0E8F5', marginBottom: '24px', lineHeight: 1.7 }}>
                        Master {course.title} with hands-on projects, quizzes, and a verifiable certificate. Taught in Hindi + English for maximum understanding.
                    </p>

                    {/* Meta row */}
                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '24px' }}>
                        <div style={{ color: '#fff', fontSize: '14px' }}>⭐ <strong>{course.rating}</strong> rating</div>
                        <div style={{ color: '#fff', fontSize: '14px' }}>👥 <strong>{course.totalStudents?.toLocaleString()}</strong> students</div>
                        <div style={{ color: '#fff', fontSize: '14px' }}>⏱ <strong>{course.durationHours} hours</strong></div>
                        <div style={{ color: '#fff', fontSize: '14px' }}>📊 <strong>{course.level}</strong></div>
                        <div style={{ color: '#fff', fontSize: '14px' }}>🌐 <strong>{course.language}</strong></div>
                    </div>

                    {/* Stars */}
                    <div style={{ color: '#FF6B00', fontSize: '20px', marginBottom: '8px' }}>★★★★★</div>
                </div>

                {/* ENROLL CARD */}
                <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', width: '320px', flexShrink: 0, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
                    <div style={{ background: '#D0E8F5', borderRadius: '12px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', fontSize: '48px' }}>
                        🎓
                    </div>
                    <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '36px', color: '#FF6B00', marginBottom: '4px' }}>
                        ₹{course.price}
                    </div>
                    <div style={{ fontSize: '13px', color: '#888', textDecoration: 'line-through', marginBottom: '16px' }}>
                        ₹4,999 (92% off)
                    </div>
                    {enrollMsg && (
                        <div style={{ background: enrolled ? '#E6F5EE' : '#FFF0F0', border: `1px solid ${enrolled ? '#117A65' : '#FFD0D0'}`, borderRadius: '10px', padding: '10px 14px', marginBottom: '12px', fontSize: '14px', color: enrolled ? '#117A65' : '#CC0000' }}>
                            {enrollMsg}
                        </div>
                    )}
                    <button
                        onClick={handleEnroll}
                        disabled={enrolling || enrolled}
                        style={{ width: '100%', background: enrolled ? '#117A65' : '#FF6B00', color: '#fff', border: 'none', padding: '15px', borderRadius: '10px', fontWeight: 700, fontSize: '16px', cursor: enrolled ? 'default' : 'pointer', marginBottom: '12px' }}
                    >
                        {enrolled ? '✅ Already Enrolled' : enrolling ? 'Enrolling...' : `Enroll Now — ₹${course.price}`}
                    </button>
                    <button className="lx-btn-secondary" style={{ width: '100%', padding: '14px', fontSize: '15px', borderRadius: '12px' }}>
                        Watch Free Preview
                    </button>
                    <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '16px' }}>
                        <div style={{ fontSize: '13px', color: '#555', marginBottom: '8px' }}>✅ Lifetime access</div>
                        <div style={{ fontSize: '13px', color: '#555', marginBottom: '8px' }}>✅ Verifiable certificate</div>
                        <div style={{ fontSize: '13px', color: '#555', marginBottom: '8px' }}>✅ Hindi + English</div>
                        <div style={{ fontSize: '13px', color: '#555', marginBottom: '8px' }}>✅ Mobile friendly</div>
                        <div style={{ fontSize: '13px', color: '#555' }}>✅ 30-day money back</div>
                    </div>
                </div>
            </div>

            {/* WHAT YOU WILL LEARN */}
            <section style={{ padding: '50px 60px', background: '#F0F8FF' }}>
                <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px', color: '#1F4E79', marginBottom: '24px' }}>
                    What You Will Learn
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', maxWidth: '800px' }}>
                    {[
                        `Fundamentals of ${course.title}`,
                        'Real-world project from scratch',
                        'Industry best practices',
                        'Hands-on coding exercises',
                        'Quiz-based learning per section',
                        'Certificate on completion',
                        'Community support & Q&A',
                        'Regular content updates',
                    ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '15px', color: '#333' }}>
                            <span style={{ color: '#117A65', fontWeight: 700, flexShrink: 0 }}>✓</span>
                            {item}
                        </div>
                    ))}
                </div>
            </section>

            {/* SYLLABUS */}
            <section style={{ padding: '50px 60px' }}>
                <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px', color: '#1F4E79', marginBottom: '8px' }}>
                    Course Syllabus
                </h2>
                <p style={{ fontSize: '15px', color: '#888', marginBottom: '28px' }}>
                    {course.durationHours} hours total · {syllabus.length} sections · {syllabus.reduce((a, b) => a + b.lessons, 0)} lessons
                </p>
                <div style={{ maxWidth: '800px' }}>
                    {syllabus.map((s, i) => (
                        <div key={i} style={{ border: '1px solid #e8e8e8', borderRadius: '12px', marginBottom: '12px', overflow: 'hidden' }}>
                            <div style={{ background: '#F8F9FA', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <span style={{ fontSize: '12px', color: '#888', marginRight: '8px' }}>{s.section}</span>
                                    <span style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '15px', color: '#1A1A2E' }}>{s.title}</span>
                                </div>
                                <span style={{ fontSize: '13px', color: '#888' }}>{s.lessons} lessons</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* INSTRUCTOR */}
            <section style={{ padding: '50px 60px', background: '#F0F8FF' }}>
                <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px', color: '#1F4E79', marginBottom: '24px' }}>
                    Your Instructor
                </h2>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', maxWidth: '700px' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#1F4E79', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Poppins', fontWeight: 700, fontSize: '28px', flexShrink: 0 }}>
                        LT
                    </div>
                    <div>
                        <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px', color: '#1A1A2E', marginBottom: '4px' }}>Laximo Tech Team</div>
                        <div style={{ fontSize: '14px', color: '#FF6B00', fontWeight: 600, marginBottom: '12px' }}>Industry Experts · Greater Noida West</div>
                        <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.7 }}>
                            Our instructors are industry professionals with years of real-world experience. All courses are taught in Hindi + English to ensure maximum clarity for Indian learners.
                        </p>
                    </div>
                </div>
            </section>

            {/* BOTTOM CTA */}
            <section style={{ background: '#FF6B00', padding: '50px 60px', textAlign: 'center' }}>
                <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '32px', color: '#fff', marginBottom: '12px' }}>
                    Ready to start learning {course.title}?
                </h2>
                <p style={{ fontSize: '17px', color: '#fff', opacity: 0.9, marginBottom: '28px' }}>
                    Join {course.totalStudents?.toLocaleString()}+ students already enrolled
                </p>
                <button
                    onClick={handleEnroll}
                    disabled={enrolling || enrolled}
                    style={{ background: '#fff', color: enrolled ? '#117A65' : '#FF6B00', border: 'none', padding: '18px 48px', borderRadius: '28px', fontWeight: 700, fontSize: '18px', cursor: enrolled ? 'default' : 'pointer' }}
                >
                    {enrolled ? '✅ Already Enrolled' : enrolling ? 'Enrolling...' : `Enroll Now — ₹${course.price}`}
                </button>
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