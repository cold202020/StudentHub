import { Link,useParams } from "react-router-dom";
import { useEffect,useContext } from "react";
import { StudentContext } from "./context/StudentContext";
import './StudentProfile.css';
function StudentProfile() {
  const { id } = useParams();

  const { students } = useContext(StudentContext);

  const student = students.find(
    student => String(student.id) === id
  );

  if (!student) {
    return <h2>Student not found!</h2>;
  }

  useEffect(() => {
  const timer = setInterval(() => {
    console.log("Student profile is open");
  }, 3000);

  return () => {
    clearInterval(timer);
    console.log("Student profile closed");
  };
}, []);

  return (
  <div className="profile-container">

    <div className="profile-card">

      <div className="profile-avatar">
        {student.name.charAt(0).toUpperCase()}
      </div>

      <h1>{student.name}</h1>
      <p className="profile-subtitle">Student Profile</p>

      <div className="profile-info">
        <div className="info-item">
          <span>Student ID</span>
          <strong>{student.id}</strong>
        </div>

        <div className="info-item">
          <span>Department</span>
          <strong>{student.department}</strong>
        </div>

        <div className="info-item">
          <span>Academic Year</span>
          <strong>Year {student.year}</strong>
        </div>
      </div>

      <Link to="/students" className="back-btn">
        ← Back to Students
      </Link>

    </div>
  </div>
);
}

export default StudentProfile;