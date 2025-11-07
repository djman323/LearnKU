const fs = require('fs')
const path = require('path')

/**
 * Scans public/Resources/ folder and returns structured data:
 * {
 *   departments: [
 *     {
 *       name: "AIML",
 *       semesters: [
 *         {
 *           name: "Semester-1",
 *           pdfs: [
 *             { name: "Mathematics-I.pdf", path: "/Resources/AIML/Semester-1/Mathematics-I.pdf" }
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
      const pdfs = []

      const files = fs.readdirSync(semPath, { withFileTypes: true })
        .filter(dirent => dirent.isFile() && dirent.name.toLowerCase().endsWith('.pdf'))
        .map(dirent => dirent.name)
        .sort()

      for (const fileName of files) {
        pdfs.push({
          name: fileName,
          // Public path relative to website root
          path: `/Resources/${deptName}/${semName}/${fileName}`
        })
      }

      semesters.push({
        name: semName,
        pdfs
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
