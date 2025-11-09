const fs = require('fs')
const path = require('path')

/**
 * Scans public/Resources/ folder and returns structured data with subjects:
 * {
 *   departments: [
 *     {
 *       name: "AIML",
 *       semesters: [
 *         {
 *           name: "Semester-1",
 *           subjects: [
 *             {
 *               name: "Mathematics",
 *               pdfs: [{ name: "Unit-1.pdf", path: "/Resources/AIML/Semester-1/Mathematics/Unit-1.pdf" }]
 *             }
 *           ]
 *         }
 *       ]
 *     }
 *   ]
 * }
 */
function scanResources() {
  const resourcesPath = path.join(process.cwd(), 'public', 'Resources')
  
  if (!fs.existsSync(resourcesPath)) {
    return { departments: [] }
  }

  const departments = []
  const deptDirs = fs.readdirSync(resourcesPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .sort()

  for (const deptName of deptDirs) {
    const deptPath = path.join(resourcesPath, deptName)
    const semesters = []

    const semesterDirs = fs.readdirSync(deptPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .sort((a, b) => {
        // Sort semesters numerically (Semester-1, Semester-2, ...)
        const numA = parseInt(a.replace(/\D/g, '')) || 0
        const numB = parseInt(b.replace(/\D/g, '')) || 0
        return numA - numB
      })

    for (const semName of semesterDirs) {
      const semPath = path.join(deptPath, semName)
      const subjects = []

      // Get all subject directories in the semester
      const subjectDirs = fs.readdirSync(semPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
        .sort()

      // If there are subject directories, organize by subjects
      if (subjectDirs.length > 0) {
        for (const subjectName of subjectDirs) {
          const subjectPath = path.join(semPath, subjectName)
          const pdfs = []

          // Get all PDFs in the subject directory
          const files = fs.readdirSync(subjectPath, { withFileTypes: true })
            .filter(file => file.isFile() && file.name.toLowerCase().endsWith('.pdf'))
            .map(file => file.name)
            .sort()

          for (const fileName of files) {
            const rel = path.join('Resources', deptName, semName, subjectName, fileName).split(path.sep).join('/')
            pdfs.push({
              name: fileName,
              path: `/${rel}`
            })
          }

          if (pdfs.length > 0) {
            subjects.push({
              name: subjectName,
              pdfs
            })
          }
        }
      } else {
        // If no subject directories, get PDFs directly from semester folder
        const pdfs = fs.readdirSync(semPath, { withFileTypes: true })
          .filter(file => file.isFile() && file.name.toLowerCase().endsWith('.pdf'))
          .map(file => {
            const rel = path.join('Resources', deptName, semName, file.name).split(path.sep).join('/')
            return {
              name: file.name,
              path: `/${rel}`
            }
          })
          .sort((a, b) => a.name.localeCompare(b.name))

        if (pdfs.length > 0) {
          subjects.push({
            name: 'General',
            pdfs
          })
        }
      }

      semesters.push({
        name: semName,
        subjects: subjects
      })
    }

    departments.push({
      name: deptName,
      semesters
    })
  }

  return { departments }
}

module.exports = { scanResources }
