import { useState, useEffect } from "react";
import "./index.css";
import {
  getStudents,
  addStudents,
  deleteStudent,
  editStudent,
} from "./components/service";
import Students from "./components/Students";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";

function App() {
  const [students, setStudents] = useState([]);
  const [showAddStudentForm, setshowAddStudentForm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [showEditStudentForm, setshowEditStudentForm] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("customStu::::::", students);
    getStudents().then((res) => {
      console.log("res::", res);

      if (res?.error === "failed") {
        setError(true);
      } else {
        setError(false);
        setStudents(res);
      }
    });
  }, [refresh]);

  console.log("mystudents:::", students);
  // const changeStudentName = () => {
  //   const newStudentList = students.map((student, index) => {
  //     if (index < 0) {
  //       student.name = "New name";
  //       student.rollNumber = "New rollNumber";
  //     } else {
  //       if (index > 0) {
  //         student.name = "New Student";
  //         student.rollNumber = "rollNumber";
  //       }
  //     }
  //     return student;
  //   });
  //   setStudents(newStudentList);
  // };

  const ondeleteStudent = (rollNumber) => {
    if (window.confirm("Are you sure, you want to Delete this record?")) {
      deleteStudent(rollNumber).then(() => {
        setRefresh(!refresh);
      });
    }
  };

  const onEditBtnClick = (student) => {
    editStudent(student).then(() => {
      setRefresh(!refresh);
      setshowEditStudentForm(false);
    });
  };
  const addNewStudent = () => {
    setshowAddStudentForm(true);
  };
  const onEditStudent = (student) => {
    setRefresh(!refresh);
    setStudentToEdit(student);
    setshowEditStudentForm(true);
  };
  const onBackclick = () => {
    setshowAddStudentForm(false);
  };

  const onBtnclick = (student) => {
    const expression = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if(!expression.test(student.email)){
      window.confirm("Invalid Email Address");
      return;
    }
      addStudents(student).then(() => {
        setRefresh(!refresh);
        setshowAddStudentForm(false);
      });
    

    // addStudents(student).then(() => {
    //   setRefresh(!refresh);
    //   setshowAddStudentForm(false);
    // });
  };

  const renderApp = () => {
    if (error) {
      return <h2>Failed to load Students Data</h2>;
    } else if (showEditStudentForm) {
      return (
        <EditStudent
          student={studentToEdit}
          onEditBackclick={() => {
            setshowEditStudentForm(false);
          }}
          onEditStudent={onEditStudent}
          onEditBtnClick={onEditBtnClick}
        />
      );
    }
    if (showAddStudentForm) {
      return <AddStudent onBackclick={onBackclick} onBtnclick={onBtnclick} />;
    }
    return (
      <Students
        students={students}
        addNewStudent={addNewStudent}
        ondeleteStudent={ondeleteStudent}
        onEditStudent={onEditStudent}
      />
    );
  };

  return <div className="App">{renderApp()}</div>;
}

export default App;
