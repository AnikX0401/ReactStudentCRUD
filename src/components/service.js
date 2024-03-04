async function getStudents() {
  try {
    const response = await fetch("http://localhost:5555/students");
    const students = await response.json();
    return students;
  } catch (error) {
    console.error("Failed to load Students Data:", error);
    return {
      error: "failed",
    };
  }
}

async function addStudents(student) {
  try{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const response = await fetch(`http://localhost:5555/student`, {
    headers: myHeaders,
    method: "POST",
    body: JSON.stringify(student),
  });
  const students = await response.json();
  return students;
} catch(error){
  console.error("Failed to Add Student:", error);
  return {
    error: "failed"
  };
}
}

async function deleteStudent(rollNumber) {
  try{
  const response = await fetch(`http://localhost:5555/student/${rollNumber}`, {
    method: "DELETE",
  });
  const students = await response.json();
  return students;
} catch(error){
  console.log("failed to Delete student:", error);
  return{
    error: "failed"
  }
}
}

async function editStudent(student) {
  try{
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
  return students;
  } catch(error){
    console.error("failed to edit student:", error);
    return{
      error: "failed"
    }
  }
}

export { getStudents, addStudents, deleteStudent, editStudent };
