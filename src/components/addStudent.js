import { useState } from "react";

// /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

const AddStudent = (props) => {
  const { onBackclick, onBtnclick } = props;
  const [name, setName] = useState();
  const [rollNumber, setRollnumber] = useState();
  const [trainings, setTrainings] = useState();
  const [email, setEmail] = useState()

  return (
    <div>
      Add New Student
      <div>
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
        </div>
      </div>
      <div>
        <button onClick={onBackclick}>back</button>
        <button
          onClick={() => {
            onBtnclick({
              name: name,
              rollNumber: Number(rollNumber),
              trainings: trainings.split(",").map((skill) => {
                return skill.trim();
              }),
              email: email
            });
          }}
        >
          Add
        </button>
      </div>
      
    </div>
  );
};

export default AddStudent;
