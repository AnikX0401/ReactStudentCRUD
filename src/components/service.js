async function getStudents() {
  try {
    const response = await fetch("http://localhost:5555/students");
    const students = await response.json();
    return students;
  } catch (error) {
    console.log("Failed to load Students Data:", error);
    return {
      error: "failed",
    };
  }
}

async function addStudents(student) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const response = await fetch(`http://localhost:5555/student`, {
    headers: myHeaders,
    method: "POST",
    body: JSON.stringify(student),
  });
  const students = await response.json();
  return students;
}

async function deleteStudent(rollNumber) {
  const response = await fetch(`http://localhost:5555/student/${rollNumber}`, {
    method: "DELETE",
  });
  const students = await response.json();
  return students;
}

async function editStudent(student) {
  /* var myHeaders = new Headers();
     myHeaders.append("Content-Type", "application/json");
     const response = await fetch (`http://localhost:5555/student/${student.rollNumber}`,{
         header: myHeaders,
         method: 'PUT',
         body: student
     })
     const students = await response.json();
     return students;*/

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(student);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `http://localhost:5555/student/${student.rollNumber}`,
    requestOptions
  );
  const students = await response.json();
  // console.log(students);
  return students;
}

export { getStudents, addStudents, deleteStudent, editStudent };
