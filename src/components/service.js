async function getStudents(){
    const response = await fetch("http://localhost:5555/students");
    const students = await response.json();
    return students;
};

async function addStudents(student){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch(`http://localhost:5555/student`,{
        headers: myHeaders,
        method: 'POST',
        body: JSON.stringify(student)
    });
    const students = await response.json();
    return students;
}

async function deleteStudent(rollNumber){
    const response = await fetch (`http://localhost:5555/student/${rollNumber}`, {method: 'DELETE'})
    const students = await response.json();
    return students;

}

async function editStudent(student){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch (`http://localhost:5555/student/${student.rollNumber}`,{
        header: myHeaders,
        method: 'PUT',
        body: JSON.stringify(student)
    })
    const students = await response.json();
    return students;
}

export{
    getStudents,
    addStudents,
    deleteStudent,
    editStudent
}