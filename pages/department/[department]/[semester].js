import Link from 'next/link'
import { scanResources } from '../../../lib/scanResources'

export default function SemesterMaterials({ department, semester, pdfs }) {
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
      <header style={{marginBottom:12}}>
        <h1 style={{margin:0}}>{department} — {semester}</h1>
        <p style={{color:'var(--muted)'}}>Download study materials below</p>
      </header>

      {pdfs.length === 0 && (
        <div className="card">No PDFs available for this semester yet.</div>
      )}

      <ul className="chapter-list">
        {pdfs.map((pdf, idx) => (
          <li key={idx} className="chapter">
            <span>{pdf.name}</span>
            <a className="download" href={pdf.path} target="_blank" rel="noopener noreferrer">Download</a>
          </li>
        ))}
      </ul>

      <p style={{marginTop:20}}>
        <Link href={`/department/${encodeURIComponent(department)}`}>← Back to {department}</Link>
      </p>
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
      pdfs: semester?.pdfs || []
    }
  }
}
