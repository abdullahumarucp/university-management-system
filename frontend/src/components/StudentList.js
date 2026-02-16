import React from 'react';

const StudentList = ({ students, onEdit, onDelete }) => {
  return (
    <div className="student-list">
      <h2>📋 Student Records ({students.length})</h2>
      {students.length === 0 ? (
        <div className="empty-state">
          <p>📚 No students found yet. Add a new student to get started!</p>
        </div>
      ) : (
        <ul>
          {students.map(student => (
            <li key={student._id}>
              <div className="student-info">
                <h3>{student.firstName} {student.lastName}</h3>
                <p><strong>ID:</strong> {student.studentId}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Phone:</strong> {student.phone}</p>
                <p><strong>Course:</strong> {student.course}</p>
                <p><strong>Year:</strong> Year {student.year}</p>
                {student.address && <p><strong>Address:</strong> {student.address}</p>}
              </div>
              <div className="student-actions">
                <button
                  onClick={() => onEdit(student)}
                  className="btn-edit"
                >
                  ✎ Edit
                </button>
                <button
                  onClick={() => onDelete(student._id)}
                  className="btn-delete"
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentList;
