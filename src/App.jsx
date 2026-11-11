import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from "react";

const About = lazy(() => import("./About"));
import Home from './Home.jsx';
import StudentCard from './StudentCard.jsx';
import StudentsLayout from './StudentsLayout.jsx';
import { StudentContext } from './context/StudentContext.jsx';
import useLocalStorage from './useLocalStorage.js';
import StudentProfile from './StudentProfile.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';

const initialStudents = [
  { id: 1, name: 'Sultan', department: 'Software Engineering', year: 3 },
  { id: 2, name: 'Abel', department: 'Computer Science', year: 2 },
  { id: 3, name: 'Daniel', department: 'Electrical Engineering', year: 3 },
];

function studentReducer(students, action) {
  switch (action.type) {
    case 'ADD_STUDENT':
      return [...students, action.payload];
    case 'DELETE_STUDENT':
      return students.filter((student) => student.id !== action.payload);
    case 'UPDATE_STUDENT':
      return students.map((student) =>
        student.id === action.payload.id
          ? { ...student, ...action.payload.updates }
          : student,
      );
    default:
      return students;
  }
}

function getInitialStudents() {
  const savedStudents = localStorage.getItem('students');
  return savedStudents ? JSON.parse(savedStudents) : initialStudents;
}

function StudentDashboard({ students, dispatch }) {
  const nameInputRef = useRef(null);
  const studentListRef = useRef(null);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [search, setSearch] = useState('');

  const filteredStudents = useMemo(
    () =>
      students.filter((student) =>
        student.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [students, search],
  );

  const deleteStudent = useCallback(
    (id) => {
      dispatch({ type: 'DELETE_STUDENT', payload: id });
    },
    [dispatch],
  );

  function addStudent(event) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedDepartment = department.trim();
    const parsedYear = Number(year);

    if (!trimmedName) {
      alert('Please enter a student name');
      return;
    }

    if (!trimmedDepartment) {
      alert('Please enter a department');
      return;
    }

    if (!Number.isInteger(parsedYear) || parsedYear < 1 || parsedYear > 6) {
      alert('Year must be between 1 and 6');
      return;
    }

    dispatch({
      type: 'ADD_STUDENT',
      payload: {
        id: Date.now(),
        name: trimmedName,
        department: trimmedDepartment,
        year: parsedYear,
      },
    });

    setName('');
    setDepartment('');
    setYear('');
  }

  return (
    <>
      <header>
        <h1>Student Management</h1>
        <p>Manage your students in one place.</p>
      </header>

      <section className="stats" aria-label="Student statistics">
        <div className="stat-card">
          <h2>{students.length}</h2>
          <p>Total Students</p>
        </div>
      </section>

      <section className="form-section">
        <h2>Add New Student</h2>
        <form onSubmit={addStudent}>
          <input
            ref={nameInputRef}
            type="text"
            placeholder="Student name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Year"
            min="1"
            max="6"
            value={year}
            onChange={(event) => setYear(event.target.value)}
            required
          />
          <button type="submit">Add Student</button>
        </form>
      </section>

      <section className="search-section">
        <input
          type="text"
          placeholder="Search students by name..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search students by name"
        />
      </section>

      <section className="students-section" ref={studentListRef}>
        <h2>Our Students</h2>
        {filteredStudents.length > 0 ? (
          <div className="students-grid">
            {filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onDelete={deleteStudent}
              />
            ))}
          </div>
        ) : (
          <p className="empty-message">No students found.</p>
        )}
      </section>

      <button
        type="button"
        className="focus"
        onClick={() => nameInputRef.current?.focus()}
      >
        Focus Student Name
      </button>
      <button
        type="button"
        className="focus-list"
        onClick={() =>
          studentListRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
      >
        Go to Student List
      </button>
    </>
  );
}

function App() {
  const [students, dispatch] = useReducer(
    studentReducer,
    undefined,
    getInitialStudents,
  );

  useLocalStorage('students', students);

  useEffect(() => {
    document.title = `Students (${students.length})`;
  }, [students.length]);

  return (
    <StudentContext.Provider value={{ students, dispatch }}>
      <div className="app">
        <nav className="navbar">
  <NavLink to="/" className="nav-item">Home</NavLink>
  <NavLink to="/students" className="nav-item">Students</NavLink>
  <NavLink to="/about" className="nav-item">About</NavLink>
</nav>
        <ErrorBoundary>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<StudentsLayout />}>
            <Route
              index
              element={
                <StudentDashboard students={students} dispatch={dispatch} />
              }
            />
            
            <Route path=":id" element={<StudentProfile />} />
          </Route>
          <Route
  path="about"
  element={
    <Suspense fallback={<h2>Loading About page...</h2>}>
      <About />
    </Suspense>
  }
/>
          
        </Routes>
        </ErrorBoundary>
      </div>
    </StudentContext.Provider>
  );
}

export default App;
