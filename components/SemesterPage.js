'use client'

import Link from 'next/link'
import { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
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

function AnimatedCard({ children, delay = 0 }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })
    
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, delay }}
        >
            {children}
        </motion.div>
    )
}

export default function SemesterPage({ department, semester, subjects }) {
    const [searchQuery, setSearchQuery] = useState('')

    const filteredSubjects = useMemo(() => {
        if (!searchQuery) return subjects
        const query = searchQuery.toLowerCase()
        return subjects.filter(subject =>
            subject.name.toLowerCase().includes(query) ||
            subject.pdfs.some(pdf => pdf.name.toLowerCase().includes(query))
        )
    }, [subjects, searchQuery])

    if (!department || !semester) {
        return (
            <main className="container">
                <h2>Materials not found</h2>
                <p><Link href="/">← Back to home</Link></p>
            </main>
        )
    }

    return (
        <motion.main
            className="container"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <header className="semester-header">
                <motion.div 
                    className="back-link-container"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Link
                        href={`/department/${encodeURIComponent(department)}`}
                        className="back-link"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Back to {department}
                    </Link>
                </motion.div>
                <motion.h1
                    className="semester-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {department} — <span className="text-gradient">{semester}</span>
                </motion.h1>
                <motion.p 
                    className="semester-meta" 
                    variants={itemVariants}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <span className="highlight">{subjects.length}</span> Subject{subjects.length !== 1 ? 's' : ''} Available
                </motion.p>

                <motion.div 
                    className="search-container" 
                    variants={itemVariants}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <input
                        type="search"
                        className="search-input"
                        placeholder="🔍 Search subjects or materials..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Search subjects and materials"
                    />
                </motion.div>
            </header>

            <motion.div layout className="subjects-grid">
                <AnimatePresence mode="popLayout">
                    {subjects.length === 0 ? (
                        <motion.div
                            className="empty-state"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.5, marginBottom: '1rem' }}>
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <path d="M14 2v6h6" />
                            </svg>
                            <p>No materials available for this semester yet.</p>
                        </motion.div>
                    ) : filteredSubjects.length === 0 ? (
                        <motion.div
                            className="empty-state"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.5, marginBottom: '1rem' }}>
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                            <p>No subjects or materials match your search.</p>
                        </motion.div>
                    ) : (
                        filteredSubjects.map((subject, subjectIdx) => (
                            <motion.div
                                key={subject.name}
                                className="subject-section"
                                layout
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.4, delay: subjectIdx * 0.1 }}
                            >
                                <div className="subject-header">
                                    <motion.h2 
                                        className="subject-name"
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        {subject.name}
                                    </motion.h2>
                                    <motion.div 
                                        className="subject-count"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", delay: 0.2 }}
                                    >
                                        {subject.pdfs.length} PDF{subject.pdfs.length !== 1 ? 's' : ''}
                                    </motion.div>
                                </div>

                                <div className="materials-grid">
                                    {subject.pdfs.map((pdf, idx) => (
                                        <AnimatedCard key={pdf.name} delay={idx * 0.05}>
                                            <motion.div
                                                className="pdf-card"
                                                whileHover={{ 
                                                    y: -8, 
                                                    borderColor: 'var(--accent-1)',
                                                    boxShadow: '0 15px 40px rgba(56, 189, 248, 0.2)'
                                                }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="pdf-name">
                                                    {pdf.name}
                                                </div>
                                                <motion.a
                                                    className="download-btn"
                                                    href={pdf.path}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                        <polyline points="7 10 12 15 17 10" />
                                                        <line x1="12" y1="15" x2="12" y2="3" />
                                                    </svg>
                                                    Download PDF
                                                </motion.a>
                                            </motion.div>
                                        </AnimatedCard>
                                    ))}
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.main>
    )
}
