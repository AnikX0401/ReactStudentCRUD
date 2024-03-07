import { useEffect, useState } from "react";
import { deleteStudent, getStudents } from "./service";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const [studentState, setStudents] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const onEditStudent = (student) => {
    navigate(`/edit/${student.rollNumber}`);
  };
  function getStudentsList() {
    getStudents().then((res) => {
      if (res?.error === "failed") {
        setError(true);
      } else {
        setStudents(res);
        setError(false);
      }
    });
  }
  useEffect(() => {
    getStudentsList();
  }, []);

  const onDeleteStudent = (rollNumber) => {
    if (window.confirm("Are you sure, you want to Delete this record?")) {
      deleteStudent(rollNumber).then(() => {
        getStudentsList();
      });
    }
  };
  if (error) {
    return <h2>Failed to load Students Data</h2>;
  }

  return (
    <div className="student-list">
      <h1>Students</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Trainings</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentState.map((student, index) => (
            <tr key={`${student?.email}_${index}`}>
              <td>{student.name}</td>
              <td>{student.rollNumber}</td>
              <td>
                {student?.trainings?.length && student.trainings.join(",  ")}
              </td>
              <td>{student.email}</td>
              <td>
                <button
                  onClick={() => {
                    onDeleteStudent(student.rollNumber);
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    onEditStudent(student);
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Students;
