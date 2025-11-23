'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
                <div className="back-link-container">
                    <Link
                        href={`/department/${encodeURIComponent(department)}`}
                        className="back-link"
                    >
                        ← Back
                    </Link>
                </div>
                <motion.h1
                    className="semester-title"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {department} — <span className="text-gradient">{semester}</span>
                </motion.h1>
                <motion.p className="semester-meta" variants={itemVariants}>
                    {subjects.length} Subject{subjects.length !== 1 ? 's' : ''} Available
                </motion.p>

                <motion.div className="search-container" variants={itemVariants}>
                    <input
                        type="search"
                        className="search-input"
                        placeholder="Search subjects or materials..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Search subjects and materials"
                    />
                    <div className="search-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </div>
                </motion.div>
            </header>

            <motion.div layout className="subjects-grid">
                <AnimatePresence mode="popLayout">
                    {subjects.length === 0 ? (
                        <motion.div
                            className="empty-state"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <p>No materials available for this semester yet.</p>
                        </motion.div>
                    ) : filteredSubjects.length === 0 ? (
                        <motion.div
                            className="empty-state"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <p>No subjects or materials match your search.</p>
                        </motion.div>
                    ) : (
                        filteredSubjects.map((subject, subjectIdx) => (
                            <motion.div
                                key={subject.name}
                                className="subject-section"
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="subject-header">
                                    <h2 className="subject-name">{subject.name}</h2>
                                    <div className="subject-count">
                                        {subject.pdfs.length} PDF{subject.pdfs.length !== 1 ? 's' : ''}
                                    </div>
                                </div>

                                <div className="materials-grid">
                                    {subject.pdfs.map((pdf, idx) => (
                                        <motion.div
                                            key={pdf.name}
                                            className="pdf-card"
                                            whileHover={{ y: -4, borderColor: 'var(--accent-1)' }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="pdf-name">
                                                {pdf.name}
                                            </div>
                                            <a
                                                className="download-btn"
                                                href={pdf.path}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                    <polyline points="7 10 12 15 17 10" />
                                                    <line x1="12" y1="15" x2="12" y2="3" />
                                                </svg>
                                                Download PDF
                                            </a>
                                        </motion.div>
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
