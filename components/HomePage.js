'use client'

import Link from 'next/link'
import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView } from 'framer-motion'
import MagneticButton from './MagneticButton'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
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

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15])
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15])

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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={itemVariants}
        >
            <div style={{ transform: "translateZ(30px)" }}>
                {children}
            </div>
        </motion.div>
    )
}

function ParallaxSection({ children, speed = 0.5, scale = false, opacity = false }) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })
    
    const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])
    const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])
    const opacityValue = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6])
    
    const style = {
        y,
        ...(scale && { scale: scaleValue }),
        ...(opacity && { opacity: opacityValue })
    }
    
    return (
        <motion.div ref={ref} style={style} className="parallax-layer">
            {children}
        </motion.div>
    )
}

function ScrollReveal({ children, direction = 'up' }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    
    const variants = {
        hidden: {
            opacity: 0,
            x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
            y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    }
    
    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
        >
            {children}
        </motion.div>
    )
}

export default function HomePage({ departments }) {
    const [q, setQ] = useState('')
    const heroRef = useRef(null)
    const { scrollYProgress } = useScroll()
    
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    const filtered = useMemo(() => {
        if (!q) return departments
        const s = q.toLowerCase().trim()
        return departments.filter(d => d.name.toLowerCase().includes(s))
    }, [departments, q])

    return (
        <>
            {/* Floating Orbs Background */}
            <div className="floating-orbs">
                <motion.div 
                    className="orb orb-1"
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 20, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className="orb orb-2"
                    animate={{
                        y: [0, 30, 0],
                        x: [0, -20, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className="orb orb-3"
                    animate={{
                        y: [0, -20, 0],
                        x: [0, 15, 0],
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <motion.main
                className="container"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <section className="hero" aria-label="Hero" ref={heroRef}>
                    <motion.div 
                        className="hero-left" 
                        variants={containerVariants}
                        style={{ opacity }}
                    >
                        <motion.h1
                            variants={itemVariants}
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
                                <motion.div 
                                    className="feature-item"
                                    whileHover={{ scale: 1.05, x: 10 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <span className="feature-check">✓</span> Semester-wise Materials
                                </motion.div>
                                <motion.div 
                                    className="feature-item"
                                    whileHover={{ scale: 1.05, x: 10 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <span className="feature-check">✓</span> Quick PDF Downloads
                                </motion.div>
                                <motion.div 
                                    className="feature-item"
                                    whileHover={{ scale: 1.05, x: 10 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <span className="feature-check">✓</span> All Departments
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div className="hero-ctas" variants={itemVariants}>
                            <MagneticButton href="#departments" className="btn">
                                <span>Browse Departments</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </MagneticButton>
                            <MagneticButton href="#features" className="btn secondary">
                                <span>How it works</span>
                            </MagneticButton>
                        </motion.div>

                        <motion.div className="search-container" variants={itemVariants}>
                            <input
                                className="search-input"
                                aria-label="Search departments"
                                placeholder="🔍 Search departments (e.g. Data Science, CSE, AIML)"
                                value={q}
                                onChange={e => setQ(e.target.value)}
                            />
                        </motion.div>
                    </motion.div>

                    <ParallaxSection speed={0.3}>
                        <motion.div
                            className="illustration"
                            aria-hidden
                            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ duration: 1.2, delay: 0.3 }}
                        >
                            <svg width="100%" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0" stopColor="var(--accent-1)" stopOpacity="0.8" />
                                        <stop offset="0.5" stopColor="var(--accent-2)" stopOpacity="0.6" />
                                        <stop offset="1" stopColor="var(--accent-3)" stopOpacity="0.4" />
                                    </linearGradient>
                                    <linearGradient id="g2" x1="1" y1="0" x2="0" y2="1">
                                        <stop offset="0" stopColor="var(--accent-2)" stopOpacity="0.6" />
                                        <stop offset="1" stopColor="var(--accent-4)" stopOpacity="0.4" />
                                    </linearGradient>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                                        <feMerge>
                                            <feMergeNode in="coloredBlur"/>
                                            <feMergeNode in="SourceGraphic"/>
                                        </feMerge>
                                    </filter>
                                </defs>
                                <motion.rect 
                                    x="50" y="50" width="500" height="300" rx="24" 
                                    fill="url(#g1)" 
                                    opacity="0.12"
                                    animate={{ 
                                        scale: [1, 1.02, 1],
                                        rotate: [0, 2, 0]
                                    }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <g opacity="0.8" filter="url(#glow)">
                                    <motion.circle 
                                        cx="150" cy="120" r="50" 
                                        fill="url(#g1)" 
                                        opacity="0.3"
                                        animate={{ scale: [1, 1.1, 1], y: [0, -10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                    />
                                    <motion.circle 
                                        cx="350" cy="200" r="40" 
                                        fill="url(#g2)" 
                                        opacity="0.3"
                                        animate={{ scale: [1, 1.15, 1], y: [0, 10, 0] }}
                                        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                                    />
                                    <motion.rect 
                                        x="400" y="100" width="120" height="120" 
                                        rx="16" 
                                        fill="url(#g1)" 
                                        opacity="0.2"
                                        animate={{ rotate: [0, 5, 0], scale: [1, 1.05, 1] }}
                                        transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
                                    />
                                </g>
                            </svg>
                        </motion.div>
                </ParallaxSection>
                </section>

                <ParallaxSection speed={0.1} scale opacity>
                    <section id="features" className="features-section">
                        <motion.h2 
                            className="section-title"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                            Why Choose LearnKU?
                        </motion.h2>
                        <motion.div
                            className="grid"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {[
                                { 
                                    title: "Smart Organization", 
                                    desc: "Navigate effortlessly through our well-structured content hierarchy: Departments → Semesters → Subjects → Topics.",
                                    icon: (
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                                            <line x1="12" y1="22.08" x2="12" y2="12"/>
                                        </svg>
                                    )
                                },
                                { 
                                    title: "Student-Centric", 
                                    desc: "Built specifically for Karnavati University students. Access course materials tailored to your curriculum.",
                                    icon: (
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                            <circle cx="9" cy="7" r="4"/>
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                        </svg>
                                    )
                                },
                                { 
                                    title: "Always Accessible", 
                                    desc: "No logins, no hassles — just instant access to your study materials. Download PDFs directly.",
                                    icon: (
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="7 10 12 15 17 10"/>
                                            <line x1="12" y1="15" x2="12" y2="3"/>
                                        </svg>
                                    )
                                },
                                { 
                                    title: "Regular Updates", 
                                    desc: "Stay current with the latest study materials. Our collection is regularly updated.",
                                    icon: (
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="23 4 23 10 17 10"/>
                                            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                                        </svg>
                                    )
                                }
                            ].map((feature, i) => (
                                <TiltCard
                                    key={i}
                                    className="card feature-card"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1, type: "spring" }}
                                        style={{ 
                                            marginBottom: '1rem',
                                            color: 'var(--accent-1)',
                                            display: 'inline-block'
                                        }}
                                    >
                                        {feature.icon}
                                    </motion.div>
                                    <h3>{feature.title}</h3>
                                    <p style={{ color: 'var(--text-muted)' }}>{feature.desc}</p>
                                </TiltCard>
                            ))}
                        </motion.div>
                    </section>
                </ParallaxSection>

                <ParallaxSection speed={0.15} scale opacity>
                    <section id="departments" className="departments-section">
                        <motion.h2 
                            className="section-title"
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            Explore Departments
                        </motion.h2>

                        <motion.div 
                            className="section-subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            {filtered.length} department{filtered.length !== 1 ? 's' : ''} found
                        </motion.div>

                        <motion.div
                            className="grid"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {departments.length === 0 && (
                                <motion.div 
                                    className="card"
                                    variants={itemVariants}
                                >
                                    <p>No departments found. Add folders to <code>public/Resources/</code></p>
                                </motion.div>
                            )}
                            {filtered.map((dept, index) => (
                                <TiltCard
                                    key={dept.name}
                                    className="card dept-card"
                                >
                                    <motion.h3 
                                        className="dept-title"
                                        whileHover={{ 
                                            scale: 1.05,
                                            color: 'var(--accent-1)'
                                        }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        {dept.name}
                                    </motion.h3>

                                    <div className="dept-meta">
                                        <motion.div 
                                            className="meta-item"
                                            whileHover={{ x: 5 }}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5" />
                                            </svg>
                                            {dept.semesters.length} Semester{dept.semesters.length !== 1 ? 's' : ''}
                                        </motion.div>
                                        <motion.div 
                                            className="meta-item"
                                            whileHover={{ x: 5 }}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                <path d="M14 2v6h6" />
                                            </svg>
                                            {dept.semesters.reduce((sum, sem) =>
                                                sum + (sem.subjects?.reduce((total, subject) => total + subject.pdfs.length, 0) || 0), 0)} PDFs
                                        </motion.div>
                                    </div>

                                    <div className="dept-actions">
                                        <MagneticButton 
                                            href={`/department/${encodeURIComponent(dept.name)}`} 
                                            className="btn"
                                        >
                                            <span>View Semesters</span>
                                            <motion.svg 
                                                width="16" 
                                                height="16" 
                                                viewBox="0 0 24 24" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                strokeWidth="2"
                                                whileHover={{ x: 5 }}
                                            >
                                                <path d="M5 12h14M12 5l7 7-7 7"/>
                                            </motion.svg>
                                        </MagneticButton>
                                    </div>
                                </TiltCard>
                            ))}
                        </motion.div>
                    </section>
                </ParallaxSection>

                <ParallaxSection speed={0.2}>
                    <motion.footer 
                        style={{ 
                            marginTop: 80, 
                            padding: '4rem 0', 
                            borderTop: '1px solid var(--border)',
                            background: 'var(--glass-bg)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '32px 32px 0 0'
                        }}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '0 2rem' }}>
                            <motion.h3 
                                style={{ 
                                    marginBottom: '24px', 
                                    color: 'var(--text-bright)',
                                    fontSize: '2rem'
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                About <span className="text-gradient">LearnKU</span>
                            </motion.h3>
                            <motion.p 
                                style={{ 
                                    color: 'var(--text-muted)', 
                                    marginBottom: '32px', 
                                    lineHeight: '1.8',
                                    fontSize: '1.1rem'
                                }}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                LearnKU is a student-driven initiative at Karnavati University, designed to streamline access to academic resources.
                                Our mission is to make quality study materials easily accessible to every KU student, helping you excel in your academic journey.
                            </motion.p>
                            
                            <motion.div 
                                style={{ 
                                    color: 'var(--text-muted)', 
                                    fontSize: '0.95rem', 
                                    marginTop: '32px',
                                    padding: '2rem',
                                    background: 'var(--card-bg)',
                                    borderRadius: '20px',
                                    border: '1px solid var(--border)'
                                }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                <div style={{ marginBottom: 16, fontWeight: 600, color: 'var(--text)' }}>
                                    💡 Want to contribute?
                                </div>
                                <div>
                                    Add study materials to help your fellow students by contributing to{' '}
                                    <code style={{ 
                                        background: 'var(--bg-3)', 
                                        padding: '4px 8px', 
                                        borderRadius: '6px',
                                        color: 'var(--accent-1)'
                                    }}>
                                        public/Resources/
                                    </code>
                                </div>
                            </motion.div>
                            
                            <motion.div 
                                style={{ 
                                    marginTop: '40px', 
                                    fontSize: '0.9rem', 
                                    color: 'var(--text-muted)',
                                    paddingTop: '32px',
                                    borderTop: '1px solid var(--border)'
                                }}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                >
                                    © {new Date().getFullYear()} LearnKU - Made with{' '}
                                    <motion.span
                                        style={{ display: 'inline-block', color: '#f472b6' }}
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    >
                                        ♥
                                    </motion.span>
                                    {' '}for Karnavati University
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.footer>
                </ParallaxSection>
            </motion.main>
        </>
    )
}
