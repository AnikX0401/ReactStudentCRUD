import { useState } from "react"

const AddStudent = (props) => {
    const { onBackclick, onBtnclick } = props;
    const [name, setName] = useState();
    const [rollNumber, setRollnumber] = useState();
    const [trainings, setTrainings] = useState();

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
                        }} />
                </div>
                <div className="field">
                    <label htmlFor="rollno">rollNumber:</label>
                    <input
                        type="text"
                        id="rollNumber"
                        value={rollNumber}
                        onChange={(event) => {
                            setRollnumber(event.target.value);
                        }} />
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
                        }} />
                </div>
            </div>
            <div>
                
                <button onClick={onBackclick}>back</button>
                <button onClick={() => {
                    onBtnclick({
                        name: name,
                        rollNumber: Number(rollNumber),
                        trainings: trainings.split(",").map((skill)=>{return skill.trim()})
                    })
                }}>Add</button>
            </div>
        </div>

    )
}

export default AddStudent;