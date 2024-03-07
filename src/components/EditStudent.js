import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentByRollNumber, editStudent } from "./service";

const EditStudent = () => {
  const [student, setStudent] = useState();
  let { rollNumber } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getStudentByRollNumber(rollNumber).then((student) => {
      setStudent(student);
    });
  }, [rollNumber]);

  return (
    <div>
      Edit Student
      {student && (
        <div>
          <div className="field">
            <label htmlFor="name">name:</label>
            <input
              type="text"
              id="name"
              value={student.name}
              onChange={(event) => {
                setStudent({
                  ...student,
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
              value={student.rollNumber}
              disabled="true"
            />
          </div>
          <div className="field">
            <label htmlFor="trainings">trainings:</label>
            <input
              type="text"
              id="trainings"
              value={student.trainings}
              placeholder="Enter comma Seperated Skills"
              onChange={(event) => {
                setStudent({
                  ...student,
                  trainings: event.target.value,
                });
              }}
            />
          </div>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            back
          </button>
          <button
            onClick={() => {
              let trainings = student.trainings;
              if (typeof trainings === "string") {
                trainings = trainings.split(",").map((skill) => skill.trim());
              }
              editStudent({
                name: student.name,
                rollNumber: Number(student.rollNumber),
                trainings,
              }).then(() => {
                navigate("/");
              });
            }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default EditStudent;
