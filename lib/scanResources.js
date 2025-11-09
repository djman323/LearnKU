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

    // Helper: recursively collect PDF file absolute paths under a directory
    function collectPdfFiles(dir) {
      let results = []
      const entries = fs.readdirSync(dir, { withFileTypes: true })
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isFile() && entry.name.toLowerCase().endsWith('.pdf')) {
          results.push(fullPath)
        } else if (entry.isDirectory()) {
          results = results.concat(collectPdfFiles(fullPath))
        }
      }
      return results
    }

    for (const semName of semesterDirs) {
      const semPath = path.join(deptPath, semName)
      const pdfs = []

      // Collect PDFs anywhere under the semester directory (including nested topic folders)
      const filePaths = collectPdfFiles(semPath).sort()

      for (const fileFullPath of filePaths) {
        const fileName = path.basename(fileFullPath)
        // Build public path relative to site root, preserving nested folders under Resources
        const rel = path.relative(path.join(process.cwd(), 'public'), fileFullPath).split(path.sep).join('/')
        pdfs.push({
          name: fileName,
          path: `/${rel}`
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
