import Link from 'next/link'
import { useState, useMemo } from 'react'
import { scanResources } from '../../../lib/scanResources'

export default function SemesterMaterials({ department, semester, subjects }) {
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
    <main className="container">
      <header className="semester-header">
        <div className="back-link-container">
          <Link 
            href={`/department/${encodeURIComponent(department)}`}
            className="back-link"
          >
            ← Back
          </Link>
        </div>
        <h1 className="semester-title">{department} — {semester}</h1>
        <p className="semester-meta">
          {subjects.length} Subject{subjects.length !== 1 ? 's' : ''} Available
        </p>
        
        <div className="search-container">
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
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
        </div>
      </header>

      {subjects.length === 0 ? (
        <div className="empty-state">
          <p>No materials available for this semester yet.</p>
        </div>
      ) : filteredSubjects.length === 0 ? (
        <div className="empty-state">
          <p>No subjects or materials match your search.</p>
        </div>
      ) : (
        filteredSubjects.map((subject, subjectIdx) => (
          <div key={subjectIdx} className="subject-section">
            <div className="subject-header">
              <h2 className="subject-name">{subject.name}</h2>
              <div className="subject-count">
                {subject.pdfs.length} PDF{subject.pdfs.length !== 1 ? 's' : ''}
              </div>
            </div>

            <div className="materials-grid">
              {subject.pdfs.map((pdf, idx) => (
                <div key={idx} className="pdf-card">
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
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download PDF
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </main>
  )
}

export async function getStaticPaths() {
  const data = scanResources()
  const paths = []

  for (const dept of data.departments) {
    for (const sem of dept.semesters) {
      paths.push({
        params: {
          department: dept.name,
          semester: sem.name
        }
      })
    }
  }

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const data = scanResources()
  const department = data.departments.find(d => d.name === params.department)
  const semester = department?.semesters.find(s => s.name === params.semester)

  return {
    props: {
      department: params.department,
      semester: params.semester,
      subjects: semester?.subjects || []
    }
  }
}
