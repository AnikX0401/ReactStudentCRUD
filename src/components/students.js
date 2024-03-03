const Students = (props) => {
  const {
    students = [],
    addNewStudent,
    ondeleteStudent,
    onEditStudent,
  } = props;

  console.log("Studd::", students);
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
          {students.map((student, index) => (
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
                    ondeleteStudent(student.rollNumber);
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
      <button onClick={addNewStudent}>Add New Student</button>
    </div>
  );
};
export default Students;
