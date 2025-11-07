// Data structure for organizing study materials
const studyMaterials = {
    cs: {
        name: 'Computer Science',
        semesters: {
            sem1: {
                name: 'Semester 1',
                subjects: {
                    'programming-fundamentals': {
                        name: 'Programming Fundamentals',
                        code: 'CS101',
                        materials: {
                            notes: [
                                { title: 'Introduction to Programming', description: 'Basic programming concepts and C language', url: '#' },
                                { title: 'Control Structures', description: 'If-else, loops, and switch statements', url: '#' },
                                { title: 'Functions and Arrays', description: 'User-defined functions and array operations', url: '#' }
                            ],
                            books: [
                                { title: 'Let Us C by Yashavant Kanetkar', description: 'Comprehensive guide to C programming', url: '#' },
                                { title: 'The C Programming Language', description: 'Kernighan and Ritchie classic', url: '#' }
                            ],
                            videos: [
                                { title: 'C Programming Tutorial for Beginners', description: 'Complete video series', url: '#' }
                            ]
                        }
                    },
                    'mathematics-1': {
                        name: 'Engineering Mathematics I',
                        code: 'MA101',
                        materials: {
                            notes: [
                                { title: 'Calculus - Differentiation', description: 'Limits, continuity, and derivatives', url: '#' },
                                { title: 'Calculus - Integration', description: 'Definite and indefinite integrals', url: '#' }
                            ],
                            books: [
                                { title: 'Higher Engineering Mathematics', description: 'B.S. Grewal', url: '#' }
                            ]
                        }
                    }
                }
            },
            sem2: {
                name: 'Semester 2',
                subjects: {
                    'data-structures': {
                        name: 'Data Structures',
                        code: 'CS201',
                        materials: {
                            notes: [
                                { title: 'Introduction to Data Structures', description: 'Arrays, linked lists, stacks, queues', url: '#' },
                                { title: 'Trees and Graphs', description: 'Binary trees, BST, graph algorithms', url: '#' }
                            ],
                            books: [
                                { title: 'Data Structures Using C', description: 'Comprehensive guide', url: '#' }
                            ]
                        }
                    }
                }
            },
            sem3: {
                name: 'Semester 3',
                subjects: {
                    'dbms': {
                        name: 'Database Management Systems',
                        code: 'CS301',
                        materials: {
                            notes: [
                                { title: 'Introduction to DBMS', description: 'Database concepts, ER diagrams, normalization', url: '#' },
                                { title: 'SQL Fundamentals', description: 'DDL, DML, DCL, and TCL commands', url: '#' },
                                { title: 'Advanced SQL', description: 'Joins, subqueries, and transactions', url: '#' },
                                { title: 'Database Design', description: 'ER to relational model, normalization techniques', url: '#' }
                            ],
                            books: [
                                { title: 'Database System Concepts', description: 'Silberschatz, Korth, and Sudarshan', url: '#' },
                                { title: 'Fundamentals of Database Systems', description: 'Elmasri and Navathe', url: '#' }
                            ],
                            videos: [
                                { title: 'DBMS Complete Course', description: 'Video lectures on database concepts', url: '#' },
                                { title: 'SQL Tutorial for Beginners', description: 'Practical SQL examples', url: '#' }
                            ],
                            papers: [
                                { title: 'Previous Year Question Paper 2023', description: 'DBMS exam paper with solutions', url: '#' },
                                { title: 'Previous Year Question Paper 2022', description: 'DBMS exam paper with solutions', url: '#' }
                            ]
                        }
                    },
                    'operating-systems': {
                        name: 'Operating Systems',
                        code: 'CS302',
                        materials: {
                            notes: [
                                { title: 'OS Introduction', description: 'OS basics, process management', url: '#' },
                                { title: 'Memory Management', description: 'Paging, segmentation, virtual memory', url: '#' }
                            ],
                            books: [
                                { title: 'Operating System Concepts', description: 'Silberschatz, Galvin, and Gagne', url: '#' }
                            ]
                        }
                    }
                }
            },
            sem4: {
                name: 'Semester 4',
                subjects: {
                    'algorithms': {
                        name: 'Design and Analysis of Algorithms',
                        code: 'CS401',
                        materials: {
                            notes: [
                                { title: 'Algorithm Complexity', description: 'Time and space complexity analysis', url: '#' },
                                { title: 'Sorting and Searching', description: 'Various sorting and searching algorithms', url: '#' }
                            ]
                        }
                    }
                }
            },
            sem5: {
                name: 'Semester 5',
                subjects: {
                    'software-engineering': {
                        name: 'Software Engineering',
                        code: 'CS501',
                        materials: {
                            notes: [
                                { title: 'SDLC Models', description: 'Waterfall, Agile, Scrum methodologies', url: '#' }
                            ]
                        }
                    }
                }
            },
            sem6: {
                name: 'Semester 6',
                subjects: {
                    'compiler-design': {
                        name: 'Compiler Design',
                        code: 'CS601',
                        materials: {
                            notes: [
                                { title: 'Lexical Analysis', description: 'Tokenization and lexer design', url: '#' }
                            ]
                        }
                    }
                }
            },
            sem7: {
                name: 'Semester 7',
                subjects: {
                    'ml': {
                        name: 'Machine Learning',
                        code: 'CS701',
                        materials: {
                            notes: [
                                { title: 'Introduction to ML', description: 'Supervised and unsupervised learning', url: '#' }
                            ]
                        }
                    }
                }
            },
            sem8: {
                name: 'Semester 8',
                subjects: {
                    'project': {
                        name: 'Major Project',
                        code: 'CS801',
                        materials: {
                            notes: [
                                { title: 'Project Guidelines', description: 'Guidelines for final year project', url: '#' }
                            ]
                        }
                    }
                }
            }
        }
    },
    ds: {
        name: 'Data Science',
        semesters: {
            sem1: {
                name: 'Semester 1',
                subjects: {
                    'python-programming': {
                        name: 'Python Programming',
                        code: 'DS101',
                        materials: {
                            notes: [
                                { title: 'Python Basics', description: 'Variables, data types, and operators', url: '#' },
                                { title: 'Python Data Structures', description: 'Lists, tuples, dictionaries, sets', url: '#' }
                            ],
                            books: [
                                { title: 'Python for Data Science', description: 'Complete guide to Python', url: '#' }
                            ]
                        }
                    }
                }
            },
            sem2: {
                name: 'Semester 2',
                subjects: {
                    'statistics': {
                        name: 'Statistics for Data Science',
                        code: 'DS201',
                        materials: {
                            notes: [
                                { title: 'Descriptive Statistics', description: 'Mean, median, mode, variance', url: '#' }
                            ]
                        }
                    }
                }
            },
            sem3: {
                name: 'Semester 3',
                subjects: {
                    'data-analytics': {
                        name: 'Data Analytics',
                        code: 'DS301',
                        materials: {
                            notes: [
                                { title: 'Data Preprocessing', description: 'Cleaning and transforming data', url: '#' }
                            ]
                        }
                    }
                }
            },
            sem4: {
                name: 'Semester 4',
                subjects: {
                    'ml-basics': {
                        name: 'Machine Learning Basics',
                        code: 'DS401',
                        materials: {
                            notes: [
                                { title: 'Linear Regression', description: 'Simple and multiple regression', url: '#' }
                            ]
                        }
                    }
                }
            },
            sem5: {
                name: 'Semester 5',
                subjects: {
                    'deep-learning': {
                        name: 'Deep Learning',
                        code: 'DS501',
                        materials: {
                            notes: [
                                { title: 'Neural Networks', description: 'Introduction to neural networks', url: '#' }
                            ]
                        }
                    }
                }
            },
            sem6: {
                name: 'Semester 6',
                subjects: {
                    'big-data': {
                        name: 'Big Data Analytics',
                        code: 'DS601',
                        materials: {
                            notes: [
                                { title: 'Hadoop Basics', description: 'Introduction to Hadoop ecosystem', url: '#' }
                            ]
                        }
                    }
                }
            },
            sem7: {
                name: 'Semester 7',
                subjects: {
                    'nlp': {
                        name: 'Natural Language Processing',
                        code: 'DS701',
                        materials: {
                            notes: [
                                { title: 'Text Processing', description: 'Tokenization and text preprocessing', url: '#' }
                            ]
                        }
                    }
                }
            },
            sem8: {
                name: 'Semester 8',
                subjects: {
                    'capstone': {
                        name: 'Capstone Project',
                        code: 'DS801',
                        materials: {
                            notes: [
                                { title: 'Project Guidelines', description: 'Capstone project requirements', url: '#' }
                            ]
                        }
                    }
                }
            }
        }
    },
    it: {
        name: 'Information Technology',
        semesters: {
            sem1: {
                name: 'Semester 1',
                subjects: {
                    'it-fundamentals': {
                        name: 'IT Fundamentals',
                        code: 'IT101',
                        materials: {
                            notes: [
                                { title: 'Computer Basics', description: 'Hardware and software fundamentals', url: '#' }
                            ]
                        }
                    }
                }
            },
            sem2: {
                name: 'Semester 2',
                subjects: {
                    'web-development': {
                        name: 'Web Development',
                        code: 'IT201',
                        materials: {
                            notes: [
                                { title: 'HTML and CSS', description: 'Frontend basics', url: '#' }
                            ]
                        }
                    }
                }
            },
            sem3: {
                name: 'Semester 3',
                subjects: {
                    'networking': {
                        name: 'Computer Networks',
                        code: 'IT301',
                        materials: {
                            notes: [
                                { title: 'Network Models', description: 'OSI and TCP/IP models', url: '#' }
                            ]
                        }
                    }
                }
            },
            sem4: {
                name: 'Semester 4',
                subjects: {
                    'cloud-computing': {
                        name: 'Cloud Computing',
                        code: 'IT401',
                        materials: {
                            notes: [
                                { title: 'Cloud Basics', description: 'IaaS, PaaS, SaaS', url: '#' }
                            ]
                        }
                    }
                }
            },
            sem5: {
                name: 'Semester 5',
                subjects: {}
            },
            sem6: {
                name: 'Semester 6',
                subjects: {}
            },
            sem7: {
                name: 'Semester 7',
                subjects: {}
            },
            sem8: {
                name: 'Semester 8',
                subjects: {}
            }
        }
    },
    ec: {
        name: 'Electronics & Communication',
        semesters: {
            sem1: {
                name: 'Semester 1',
                subjects: {
                    'circuits': {
                        name: 'Electric Circuits',
                        code: 'EC101',
                        materials: {
                            notes: [
                                { title: 'Circuit Analysis', description: 'Kirchhoff\'s laws and circuit theorems', url: '#' }
                            ]
                        }
                    }
                }
            },
            sem2: {
                name: 'Semester 2',
                subjects: {
                    'electronics': {
                        name: 'Electronic Devices',
                        code: 'EC201',
                        materials: {
                            notes: [
                                { title: 'Semiconductor Devices', description: 'Diodes, transistors, and ICs', url: '#' }
                            ]
                        }
                    }
                }
            },
            sem3: {
                name: 'Semester 3',
                subjects: {
                    'signals': {
                        name: 'Signals and Systems',
                        code: 'EC301',
                        materials: {
                            notes: [
                                { title: 'Signal Analysis', description: 'Time and frequency domain analysis', url: '#' }
                            ]
                        }
                    }
                }
            },
            sem4: {
                name: 'Semester 4',
                subjects: {
                    'communications': {
                        name: 'Communication Systems',
                        code: 'EC401',
                        materials: {
                            notes: [
                                { title: 'Modulation Techniques', description: 'AM, FM, and PM', url: '#' }
                            ]
                        }
                    }
                }
            },
            sem5: {
                name: 'Semester 5',
                subjects: {}
            },
            sem6: {
                name: 'Semester 6',
                subjects: {}
            },
            sem7: {
                name: 'Semester 7',
                subjects: {}
            },
            sem8: {
                name: 'Semester 8',
                subjects: {}
            }
        }
    }
};

let currentDepartment = null;
let currentSemester = null;
let currentSubject = null;

function showSemesters(deptCode) {
    currentDepartment = deptCode;
    const dept = studyMaterials[deptCode];
    
    document.querySelector('.departments').style.display = 'none';
    document.querySelector('.intro').style.display = 'none';
    document.getElementById('semesters').style.display = 'block';
    document.getElementById('department-title').textContent = `${dept.name} - Select Semester`;
    
    const semesterList = document.getElementById('semester-list');
    semesterList.innerHTML = '';
    
    Object.keys(dept.semesters).forEach(semKey => {
        const sem = dept.semesters[semKey];
        const semCard = document.createElement('div');
        semCard.className = 'semester-card';
        semCard.onclick = () => showSubjects(semKey);
        semCard.innerHTML = `<h3>${sem.name}</h3>`;
        semesterList.appendChild(semCard);
    });
}

function showSubjects(semesterKey) {
    currentSemester = semesterKey;
    const dept = studyMaterials[currentDepartment];
    const semester = dept.semesters[semesterKey];
    
    document.getElementById('semesters').style.display = 'none';
    document.getElementById('subjects').style.display = 'block';
    document.getElementById('semester-title').textContent = `${dept.name} - ${semester.name}`;
    
    const subjectList = document.getElementById('subject-list');
    subjectList.innerHTML = '';
    
    const subjects = Object.entries(semester.subjects);
    
    if (subjects.length === 0) {
        subjectList.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Materials for this semester will be added soon.</p>';
        return;
    }
    
    subjects.forEach(([subKey, subject]) => {
        const subCard = document.createElement('div');
        subCard.className = 'subject-card';
        subCard.onclick = () => showMaterials(subKey);
        subCard.innerHTML = `
            <h3>${subject.name}</h3>
            <p>Course Code: ${subject.code}</p>
        `;
        subjectList.appendChild(subCard);
    });
}

function showMaterials(subjectKey) {
    currentSubject = subjectKey;
    const dept = studyMaterials[currentDepartment];
    const semester = dept.semesters[currentSemester];
    const subject = semester.subjects[subjectKey];
    
    document.getElementById('subjects').style.display = 'none';
    document.getElementById('materials').style.display = 'block';
    document.getElementById('subject-title').textContent = `${subject.name} (${subject.code})`;
    
    const materialsList = document.getElementById('materials-list');
    materialsList.innerHTML = '';
    
    const materials = subject.materials;
    
    Object.keys(materials).forEach(category => {
        if (materials[category].length > 0) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'material-category';
            
            const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
            categoryDiv.innerHTML = `<h3>${categoryTitle}</h3>`;
            
            const itemsDiv = document.createElement('div');
            itemsDiv.className = 'material-items';
            
            materials[category].forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'material-item';
                itemDiv.innerHTML = `
                    <div class="material-info">
                        <h4>${item.title}</h4>
                        <p>${item.description}</p>
                    </div>
                    <a href="${item.url}" class="material-link" target="_blank">View</a>
                `;
                itemsDiv.appendChild(itemDiv);
            });
            
            categoryDiv.appendChild(itemsDiv);
            materialsList.appendChild(categoryDiv);
        }
    });
}

function backToDepartments() {
    document.getElementById('semesters').style.display = 'none';
    document.querySelector('.departments').style.display = 'block';
    document.querySelector('.intro').style.display = 'block';
    currentDepartment = null;
}

function backToSemesters() {
    document.getElementById('subjects').style.display = 'none';
    document.getElementById('semesters').style.display = 'block';
    currentSemester = null;
}

function backToSubjects() {
    document.getElementById('materials').style.display = 'none';
    document.getElementById('subjects').style.display = 'block';
    currentSubject = null;
}
