# LearnKU

An online portal for Karnavati University students where they can find all study materials organized by department, semester, and subject.

## Features

- **Department-wise Organization**: Browse materials by your department (Computer Science, Data Science, Information Technology, Electronics & Communication)
- **Semester-wise Structure**: Navigate through semesters (Sem 1 to Sem 8)
- **Subject-wise Materials**: Access study materials for each subject
- **Multiple Resource Types**: Notes, books, videos, and previous year papers
- **No Login Required**: Open access for all students
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## How to Use

1. Open `index.html` in your web browser
2. Select your department from the main page
3. Choose your semester
4. Select the subject you want to study
5. Access the study materials

## Structure

The website follows a hierarchical structure:
```
Department → Semester → Subject → Materials
```

For example:
```
Computer Science → Semester 3 → DBMS → Notes/Books/Videos/Papers
```

## Deployment

To deploy this website:

1. **GitHub Pages**: 
   - Go to repository Settings → Pages
   - Select branch as source
   - Website will be available at `https://djman323.github.io/LearnKU/`

2. **Local Testing**:
   - Simply open `index.html` in any modern web browser
   - No server setup required

## Adding New Materials

To add new study materials, edit the `script.js` file and update the `studyMaterials` object with new content following the existing structure.

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (no frameworks required)

## License

Open source for educational purposes.

## Contributing

Feel free to contribute by adding more study materials or improving the website design.
