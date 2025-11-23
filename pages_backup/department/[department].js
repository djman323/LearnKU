import Link from 'next/link'
import { scanResources } from '../../lib/scanResources'

export default function Department({ department }) {
  if (!department) {
    return (
      <main className="container">
        <h2>Department not found</h2>
        <p><Link href="/">← Back to home</Link></p>
      </main>
    )
  }

  return (
    <main className="container">
      <header style={{marginBottom:12}}>
        <h1 style={{margin:0}}>{department.name}</h1>
        <p style={{color:'var(--muted)'}}>Choose a semester to view available study materials</p>
      </header>

      <div className="grid">
        {department.semesters.length === 0 && (
          <div className="card">No semesters found for this department.</div>
        )}
        {department.semesters.map(sem => (
          <div key={sem.name} className="card">
            <h3>{sem.name}</h3>
            <p>{sem.subjects?.reduce((total, subject) => total + subject.pdfs.length, 0) || 0} PDF{sem.subjects?.reduce((total, subject) => total + subject.pdfs.length, 0) === 1 ? '' : 's'}</p>
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              marginBottom: '1rem',
              color: 'var(--muted)',
              fontSize: '0.9rem'
            }}>
              {sem.subjects?.length ? `${sem.subjects.length} Subject${sem.subjects.length === 1 ? '' : 's'}` : 'No subjects yet'}
            </div>
            <Link href={`/department/${encodeURIComponent(department.name)}/${encodeURIComponent(sem.name)}`} className="btn">
              View Materials
            </Link>
          </div>
        ))}
      </div>

      <p style={{marginTop:20}}><Link href="/">← Back to departments</Link></p>
    </main>
  )
}

export async function getStaticPaths() {
  const data = scanResources()
  const paths = data.departments.map(dept => ({
    params: { department: dept.name }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const data = scanResources()
  const department = data.departments.find(d => d.name === params.department)

  return {
    props: {
      department: department || null
    }
  }
}
