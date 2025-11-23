import Link from 'next/link'
import { scanResources } from '../../../lib/scanResources'

export async function generateStaticParams() {
    const data = scanResources()
    return data.departments.map(dept => ({
        department: dept.name
    }))
}

export default function Department({ params }) {
    const data = scanResources()
    // Decode the department name from the URL parameter
    const departmentName = decodeURIComponent(params.department)
    const department = data.departments.find(d => d.name === departmentName)

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
            <header style={{ marginBottom: 12 }}>
                <h1 style={{ margin: 0 }}>{department.name}</h1>
                <p style={{ color: 'var(--muted)' }}>Choose a semester to view available study materials</p>
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

            <p style={{ marginTop: 20 }}><Link href="/">← Back to departments</Link></p>
        </main>
    )
}
