'use client'

import Link from 'next/link'
import { useState, useMemo, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import MagneticButton from './MagneticButton'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100
        }
    }
}

function TiltCard({ children, className }) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 })
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 })

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect()
        const xPct = (clientX - left) / width - 0.5
        const yPct = (clientY - top) / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    function handleMouseLeave() {
        x.set(0)
        y.set(0)
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10])
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10])

    return (
        <motion.div
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <div style={{ transform: "translateZ(20px)" }}>
                {children}
            </div>
        </motion.div>
    )
}

export default function HomePage({ departments }) {
    const [q, setQ] = useState('')

    const filtered = useMemo(() => {
        if (!q) return departments
        const s = q.toLowerCase().trim()
        return departments.filter(d => d.name.toLowerCase().includes(s))
    }, [departments, q])

    return (
        <motion.main
            className="container"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <section className="hero" aria-label="Hero">
                <motion.div className="hero-left" variants={itemVariants}>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        LearnKU — Your <span className="text-gradient">Academic Resource</span> Hub
                    </motion.h1>
                    <motion.p variants={itemVariants}>
                        Welcome to Karnavati University's premier study material platform. Access comprehensive course materials, lecture notes, and resources across all departments. Built by students, for students.
                    </motion.p>

                    <motion.div className="hero-tagline" variants={itemVariants}>
                        Supporting Excellence in Education at Karnavati University
                    </motion.div>

                    <motion.div className="hero-features" variants={itemVariants}>
                        <div className="feature-list">
                            <div className="feature-item">
                                <span className="feature-check">✓</span> Semester-wise Materials
                            </div>
                            <div className="feature-item">
                                <span className="feature-check">✓</span> Quick PDF Downloads
                            </div>
                            <div className="feature-item">
                                <span className="feature-check">✓</span> All Departments
                            </div>
                        </div>
                    </motion.div>

                    <motion.div className="hero-ctas" variants={itemVariants}>
                        <MagneticButton href="#departments" className="btn">Browse Departments</MagneticButton>
                        <MagneticButton href="#features" className="btn secondary">How it works</MagneticButton>
                    </motion.div>

                    <motion.div className="search-container" variants={itemVariants}>
                        <input
                            className="search-input"
                            aria-label="Search departments"
                            placeholder="Search departments (e.g. Data Science, CE, AIML)"
                            value={q}
                            onChange={e => setQ(e.target.value)}
                        />
                    </motion.div>
                </motion.div>

                <motion.div
                    className="illustration"
                    aria-hidden
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    {/* Decorative SVG / illustration - subtle grid */}
                    <svg width="100%" height="160" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="g1" x1="0" x2="1">
                                <stop offset="0" stopColor="var(--accent-1)" stopOpacity="0.9" />
                                <stop offset="1" stopColor="var(--accent-2)" stopOpacity="0.8" />
                            </linearGradient>
                        </defs>
                        <rect x="0" y="0" width="600" height="300" rx="14" fill="url(#g1)" opacity="0.08" />
                        <g opacity="0.6">
                            <circle cx="120" cy="90" r="36" fill="#fff" opacity="0.02" />
                            <circle cx="260" cy="120" r="20" fill="#fff" opacity="0.03" />
                            <rect x="380" y="40" width="160" height="120" rx="8" fill="#fff" opacity="0.02" />
                        </g>
                    </svg>
                </motion.div>
            </section>

            <section id="features" className="features-section">
                <motion.h2 className="section-title" variants={itemVariants}>Why Choose LearnKU?</motion.h2>
                <motion.div
                    className="grid"
                    variants={containerVariants}
                >
                    {[
                        { title: "Smart Organization", desc: "Navigate effortlessly through our well-structured content hierarchy: Departments → Semesters → Subjects → Topics." },
                        { title: "Student-Centric", desc: "Built specifically for Karnavati University students. Access course materials tailored to your curriculum." },
                        { title: "Always Accessible", desc: "No logins, no hassles — just instant access to your study materials. Download PDFs directly." },
                        { title: "Regular Updates", desc: "Stay current with the latest study materials. Our collection is regularly updated." }
                    ].map((feature, i) => (
                        <TiltCard
                            key={i}
                            className="card"
                        >
                            <h3>{feature.title}</h3>
                            <p style={{ color: 'var(--text-muted)' }}>{feature.desc}</p>
                        </TiltCard>
                    ))}
                </motion.div>
            </section>

            <section id="departments" className="departments-section">
                <motion.h2 className="section-title" variants={itemVariants}>Departments</motion.h2>

                <motion.div className="section-subtitle" variants={itemVariants}>
                    {filtered.length} department{filtered.length !== 1 ? 's' : ''} found
                </motion.div>

                <motion.div
                    className="grid"
                    variants={containerVariants}
                >
                    {departments.length === 0 && (
                        <div className="card"><p>No departments found. Add folders to <code>public/Resources/</code></p></div>
                    )}
                    {filtered.map(dept => (
                        <TiltCard
                            key={dept.name}
                            className="card dept-card"
                        >
                            <h3 className="dept-title">{dept.name}</h3>

                            <div className="dept-meta">
                                <div className="meta-item">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5" />
                                    </svg>
                                    {dept.semesters.length} Semester{dept.semesters.length !== 1 ? 's' : ''}
                                </div>
                                <div className="meta-item">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <path d="M14 2v6h6" />
                                    </svg>
                                    {dept.semesters.reduce((sum, sem) =>
                                        sum + (sem.subjects?.reduce((total, subject) => total + subject.pdfs.length, 0) || 0), 0)} PDFs
                                </div>
                            </div>

                            <div className="dept-actions">
                                <MagneticButton href={`/department/${encodeURIComponent(dept.name)}`} className="btn">View Semesters</MagneticButton>
                                <div className="ribbon">Explore</div>
                            </div>
                        </TiltCard>
                    ))}
                </motion.div>
            </section>

            <footer style={{ marginTop: 60, padding: '32px 0', borderTop: '1px solid var(--border)' }}>
                <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '16px', color: 'var(--text-bright)' }}>About LearnKU</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.6' }}>
                        LearnKU is a student-driven initiative at Karnavati University, designed to streamline access to academic resources.
                        Our mission is to make quality study materials easily accessible to every KU student, helping you excel in your academic journey.
                    </p>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '24px' }}>
                        <div style={{ marginBottom: 12 }}>Want to contribute? Add study materials to help your fellow students:</div>
                        <div style={{ display: 'inline-block', background: 'var(--card-bg)', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                            Add files to <code>public/Resources/</code> or open an issue in the repository
                        </div>
                    </div>
                    <div style={{ marginTop: '24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        © {new Date().getFullYear()} LearnKU - Made with ♥ for Karnavati University
                    </div>
                </div>
            </footer>
        </motion.main>
    )
}
