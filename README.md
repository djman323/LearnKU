# LearnKU

AN online portal for Karnavati University students where they can find study materials organized by department and semester.

This repository contains a static Next.js site that automatically scans and displays PDFs from the `public/Resources/` folder structure.

## How it works

- Public (no login) site
- Choose Department → Semester → Download PDFs
- PDFs are automatically discovered from the folder structure at build time

## Quick start

1. Install dependencies: `npm install`
2. Run dev server: `npm run dev`
3. Open http://localhost:3000
4. Build static site: `npm run build`

## Adding study materials

The site automatically scans the `public/Resources/` folder structure:

```
public/Resources/
├── AIML/
│   ├── Semester-1/
│   │   ├── Mathematics-I.pdf
│   │   └── Programming-Basics.pdf
│   ├── Semester-2/
│   │   └── Data-Structures.pdf
│   └── Semester-3/
│       └── ... (add more PDFs here)
├── CE/
│   ├── Semester-1/
│   │   └── Engineering-Mechanics.pdf
│   └── ...
└── ME/
    └── Semester-1/
        └── Thermodynamics.pdf
```

**To add materials:**

1. Create a folder for your department (e.g., `AIML`, `CE`, `ME`)
2. Inside, create semester folders (e.g., `Semester-1`, `Semester-2`, etc.)
3. Place PDF files directly in the semester folders
4. Rebuild the site with `npm run build`

The site will automatically detect all departments, semesters, and PDFs.

## Project structure

- `pages/` — Next.js pages with dynamic routing
- `lib/scanResources.js` — Utility to scan Resources folder at build time
- `public/Resources/` — **Add your PDF materials here**
- `components/` — UI components (Layout)
- `styles/` — Global styles
