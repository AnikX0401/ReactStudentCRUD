
const Students = (props) => {
  const {
    students = [],
    addNewStudent,
    changeStudentName,
    ondeleteStudent,
    onEditStudent
  } = props;
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
        <tbody>{students.map((student) =>
        (
          <tr key={student}>
            <td>{student.name}</td>
            <td>{student.rollNumber}</td>
            <td>{student.trainings.join(',  ')}</td>
            <td>{student.email}</td>
            <button onClick={() => {
              ondeleteStudent(student.rollNumber)
            }}>Delete</button>
            <button onClick={() => {
              onEditStudent(student)
            }}>Edit</button>

          </tr>
        )
        )}
        </tbody>
      </table>
      <button onClick={changeStudentName}>Change New Student</button>
      <button onClick={addNewStudent}>Add New Student</button>
    </div>
  );
};

export default Students;