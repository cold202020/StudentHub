import './index.css';
import { useState, memo, useContext } from 'react';
import { StudentContext } from './context/StudentContext.jsx';
import { Link } from "react-router-dom";

function StudentCard({ student, onDelete }) {
  const { dispatch } = useContext(StudentContext);
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(student.name);
  const [editedDepartment, setEditedDepartment] = useState(student.department);
  const [editedYear, setEditedYear] = useState(student.year);

  function handleUpdate() {
    dispatch({
      type: "UPDATE_STUDENT",
      payload: {
        id: student.id,
        updates: {
          name: editedName.trim(),
          department: editedDepartment.trim(),
          year: Number(editedYear)
        }
      }
    });

    setIsEditing(false);
  }
  return (
    <div className="student-card">
      {isEditing ? (
        <div>
          <input
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            placeholder="Student name"
          />
          <input
            value={editedDepartment}
            onChange={(e) => setEditedDepartment(e.target.value)}
            placeholder="Department"
          />
          <input
            type="number"
            value={editedYear}
            onChange={(e) => setEditedYear(e.target.value)}
            min="1"
            placeholder="Year"
          />
        </div>
      ) : (
        <h2>{student.name}</h2>
      )}

      {showDetails && (
        <div className="student-details">
          <p>{student.department}</p>
          <p>Year: {student.year}</p>
        </div>
      )}

      <div className="card-buttons">
  <button
    className="details-btn"
    onClick={() => setShowDetails(!showDetails)}
  >
    {showDetails ? "Hide Details" : "Show Details"}
  </button>

  {isEditing ? (
    <button className="edit-btn" onClick={handleUpdate}>
      Save
    </button>
  ) : (
    <button className="edit-btn" onClick={() => setIsEditing(true)}>
      Edit Student
    </button>
  )}

  <button
    className="delete-btn"
    onClick={() => onDelete(student.id)}
  >
    Delete Studs
  </button>

  <Link className="profile-btn" to={`/students/${student.id}`}>
    View Profile
  </Link>
</div>
</div>
  );
}

export default memo(StudentCard);