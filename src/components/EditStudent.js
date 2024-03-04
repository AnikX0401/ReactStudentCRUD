import { useState } from "react";

const EditStudent = (props) => {
  const { onEditBackclick, student, onEditBtnClick } = props;
  const [editStudent, setEditStudent] = useState(student);
  console.log("Stu:::", student)
  return (
    <div>
      Edit Student
      <div>
        <div className="field">
          <label htmlFor="name">name:</label>
          <input
            type="text"
            id="name"
            value={editStudent.name}
            onChange={(event) => {
              setEditStudent({
                ...editStudent,
                name: event.target.value,
              });
            }}
          />
        </div>

        <div className="field">
          <label htmlFor="rollno">rollNumber:</label>
          <input
            type="text"
            id="rollno"
            value={editStudent.rollNumber}
            disabled="true"
          />
        </div>
        <div className="field">
          <label htmlFor="trainings">trainings:</label>
          <input
            type="text"
            id="trainings"
            value={editStudent.trainings}
            placeholder="Enter comma Seperated Skills"
            onChange={(event) => {
              setEditStudent({
                ...editStudent,
                trainings: event.target.value,
              });
            }}
          />
        </div>
        <button onClick={onEditBackclick}>back</button>
        <button
          onClick={() => {
            onEditBtnClick({
              name: editStudent.name,
              rollNumber: Number(editStudent.rollNumber),
              trainings: editStudent.trainings.split(",").map((skill) => skill.trim()),
            });
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditStudent;
