import { useState } from "react";
import { addStudents } from "./service";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [rollNumber, setRollnumber] = useState();
  const [trainings, setTrainings] = useState();
  const [email, setEmail] = useState();
  const [showDuplicateEmailError, setShowDuplicateEmailError] = useState();
  const [showDuplicateRollNoError, setShowDuplicateRollNoError] = useState();

  const onBackclick = () => {
    navigate("/");
  };

  const handleAddClick = (student) => {
    const expression = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!expression.test(student.email)) {
      window.confirm("Invalid Email Id!");
      return;
    }
    addStudents(student)
      .then((res) => {
        if (res?.error === "Email address already exist..!") {
          return setShowDuplicateEmailError(true);
        } else {
          setShowDuplicateEmailError(false);
        }
        if (res?.error === "Roll Number already exist..!") {
          return setShowDuplicateRollNoError(true);
        } else {
          setShowDuplicateRollNoError(false);
        }
        navigate("/");
      })
      .catch((err) => {
        console.log("AddStudent Error::", err);
      });
  };

  return (
    <>
      <div>
        Add New Student
        <div id="myContainer">
          <div className="field">
            <label htmlFor="name">name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="field">
            <label htmlFor="rollno">rollNumber:</label>
            <input
              type="text"
              id="rollno"
              value={rollNumber}
              onChange={(event) => {
                setRollnumber(event.target.value);
              }}
            />
            {showDuplicateRollNoError ? "Its duplicate Roll number..!" : null}
          </div>
          <div className="field">
            <label htmlFor="trainings">trainings:</label>
            <input
              type="text"
              id="trainings"
              value={trainings}
              placeholder="Enter comma Seperated Skills"
              onChange={(event) => {
                setTrainings(event.target.value);
              }}
            />
          </div>
          <div className="field">
            <label htmlFor="email">email:</label>
            <input
              type="text"
              id="email"
              value={email}
              placeholder="Enter Email Address"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            {showDuplicateEmailError ? "Hey duplicate email id" : null}
          </div>
        </div>
        <div>
          <button onClick={onBackclick}>back</button>
          <button
            onClick={() => {
              handleAddClick({
                name: name,
                rollNumber: Number(rollNumber),
                trainings: trainings.split(",").map((skill) => {
                  return skill.trim();
                }),
                email: email,
              });
            }}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default AddStudent;
