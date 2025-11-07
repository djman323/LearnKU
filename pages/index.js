import Link from 'next/link'
import { scanResources } from '../lib/scanResources'

export default function Home({ departments }) {
  return (
    <main className="container">
      <h1>LearnKU - Karnavati University Study Materials</h1>
      <p>Choose your department to browse semester-wise study materials.</p>

      <div className="grid">
        {departments.length === 0 && (
          <p>No departments found. Add folders to <code>public/Resources/</code></p>
        )}
        {departments.map(dept => (
          <div key={dept.name} className="card">
            <h3>{dept.name}</h3>
            <p>{dept.semesters.length} semester{dept.semesters.length !== 1 ? 's' : ''}</p>
            <Link href={`/department/${encodeURIComponent(dept.name)}`} className="btn">
              View Semesters
            </Link>
          </div>
        ))}
      </div>

      <footer style={{marginTop:40, fontSize:'.9rem'}}>
        Note: No login required — all materials are publicly accessible.
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
