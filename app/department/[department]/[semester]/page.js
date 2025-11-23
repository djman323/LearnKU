import { scanResources } from '../../../../lib/scanResources'
import SemesterPage from '../../../../components/SemesterPage'

export async function generateStaticParams() {
    const data = scanResources()
    const paths = []

    for (const dept of data.departments) {
        for (const sem of dept.semesters) {
            paths.push({
                department: dept.name,
                semester: sem.name
            })
        }
    }
    return paths
}

export default function Page({ params }) {
    const data = scanResources()
    // In App Router, params are decoded, so we can use them directly
    const departmentName = params.department
    const semesterName = params.semester

    const department = data.departments.find(d => d.name === departmentName)
    const semester = department?.semesters.find(s => s.name === semesterName)

    return (
        <SemesterPage
            department={departmentName}
            semester={semesterName}
            subjects={semester?.subjects || []}
        />
    )
}
