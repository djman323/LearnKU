import Link from 'next/link'
import { useState, useMemo } from 'react'
import { scanResources } from '../lib/scanResources'

export default function Home({ departments }) {
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    if (!q) return departments
    const s = q.toLowerCase().trim()
    return departments.filter(d => d.name.toLowerCase().includes(s))
  }, [departments, q])

  return (
    <main className="container">
      <section className="hero" aria-label="Hero">
        <div className="hero-left">
          <h1>LearnKU — Your Academic Resource Hub</h1>
          <p>Welcome to Karnavati University's premier study material platform. Access comprehensive course materials, lecture notes, and resources across all departments. Built by students, for students, to enhance your learning journey.</p>

          <div className="hero-tagline" style={{marginTop: '12px', marginBottom: '20px', color: 'var(--accent-1)', fontWeight: '500'}}>
            Supporting Excellence in Education at Karnavati University
          </div>

          <div className="hero-features" style={{marginBottom: '24px'}}>
            <div style={{display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--muted)'}}>
                <span style={{color: 'var(--accent-2)'}}>✓</span> Semester-wise Materials
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--muted)'}}>
                <span style={{color: 'var(--accent-2)'}}>✓</span> Quick PDF Downloads
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--muted)'}}>
                <span style={{color: 'var(--accent-2)'}}>✓</span> All Departments
              </div>
            </div>
          </div>

          <div className="hero-ctas">
            <Link href="#departments" className="btn">Browse Departments</Link>
            <Link href="#features" className="btn secondary">How it works</Link>
          </div>

          <div style={{marginTop:20}}>
            <input 
              aria-label="Search departments" 
              placeholder="Search departments (e.g. Data Science, CE, AIML)" 
              value={q} 
              onChange={e => setQ(e.target.value)} 
              style={{
                width:'100%',
                padding:'12px 16px',
                borderRadius:12,
                border:'1px solid rgba(255,255,255,0.08)',
                background:'rgba(255,255,255,0.02)',
                color:'inherit',
                fontSize: '0.95rem'
              }} 
            />
          </div>
        </div>

        <div className="illustration" aria-hidden>
          {/* Decorative SVG / illustration - subtle grid */}
          <svg width="100%" height="160" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0" stopColor="#7c5cff" stopOpacity="0.9" />
                <stop offset="1" stopColor="#6ee7f9" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="600" height="300" rx="14" fill="url(#g1)" opacity="0.08" />
            <g opacity="0.6">
              <circle cx="120" cy="90" r="36" fill="#fff" opacity="0.02" />
              <circle cx="260" cy="120" r="20" fill="#fff" opacity="0.03" />
              <rect x="380" y="40" width="160" height="120" rx="8" fill="#fff" opacity="0.02" />
            </g>
          </svg>
        </div>
      </section>

      <section id="features" style={{margin: '4rem 0 5rem'}}>
        <h2 style={{marginBottom: '2.5rem', textAlign: 'center', fontSize: '2rem'}}>Why Choose LearnKU?</h2>
        <div className="grid">
          <div className="card">
            <h3>Smart Organization</h3>
            <p style={{color:'var(--muted)'}}>Navigate effortlessly through our well-structured content hierarchy: Departments → Semesters → Subjects → Topics. Find exactly what you need in seconds.</p>
          </div>
          <div className="card">
            <h3>Student-Centric</h3>
            <p style={{color:'var(--muted)'}}>Built specifically for Karnavati University students. Access course materials, lecture notes, and study resources tailored to your curriculum.</p>
          </div>
          <div className="card">
            <h3>Always Accessible</h3>
            <p style={{color:'var(--muted)'}}>No logins, no hassles — just instant access to your study materials. Download PDFs directly and start studying right away.</p>
          </div>
          <div className="card">
            <h3>Regular Updates</h3>
            <p style={{color:'var(--muted)'}}>Stay current with the latest study materials. Our collection is regularly updated to match your evolving curriculum needs.</p>
          </div>
        </div>
      </section>

      <section id="departments" style={{marginTop: '5rem'}}>
        <h2 style={{fontSize: '2rem', marginBottom: '1rem'}}>Departments</h2>

        <div style={{marginBottom: '2rem', color:'var(--muted)', fontSize: '1.1rem'}}>{filtered.length} department{filtered.length !== 1 ? 's' : ''} found</div>

        <div className="grid">
          {departments.length === 0 && (
            <div className="card"><p>No departments found. Add folders to <code>public/Resources/</code></p></div>
          )}
          {filtered.map(dept => (
            <div key={dept.name} className="card dept-card">
              <h3 className="dept-title">{dept.name}</h3>
              
              <div className="dept-meta">
                <div className="meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5"/>
                  </svg>
                  {dept.semesters.length} Semester{dept.semesters.length !== 1 ? 's' : ''}
                </div>
                <div className="meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <path d="M14 2v6h6"/>
                  </svg>
                  {dept.semesters.reduce((sum, sem) => sum + sem.pdfs.length, 0)} PDFs
                </div>
              </div>

              <div className="dept-actions">
                <Link href={`/department/${encodeURIComponent(dept.name)}`} className="btn">View Semesters</Link>
                <div className="ribbon">Explore</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{marginTop:60, padding: '32px 0', borderTop: '1px solid rgba(255,255,255,0.04)'}}>
        <div style={{maxWidth: '720px', margin: '0 auto', textAlign: 'center'}}>
          <h3 style={{marginBottom: '16px', color: '#fff'}}>About LearnKU</h3>
          <p style={{color:'var(--muted)', marginBottom: '20px', lineHeight: '1.6'}}>
            LearnKU is a student-driven initiative at Karnavati University, designed to streamline access to academic resources. 
            Our mission is to make quality study materials easily accessible to every KU student, helping you excel in your academic journey.
          </p>
          <div style={{color:'var(--muted)', fontSize: '0.9rem', marginTop: '24px'}}>
            <div style={{marginBottom:12}}>Want to contribute? Add study materials to help your fellow students:</div>
            <div style={{display: 'inline-block', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '6px'}}>
              Add files to <code>public/Resources/</code> or open an issue in the repository
            </div>
          </div>
          <div style={{marginTop: '24px', fontSize: '0.85rem', color: 'var(--muted)'}}>
            © {new Date().getFullYear()} LearnKU - Made with ♥ for Karnavati University
          </div>
        </div>
      </footer>
    </main>
  )
}

export async function getStaticProps() {
  const data = scanResources()
  return {
    props: {
      departments: data.departments
    }
  }
}
