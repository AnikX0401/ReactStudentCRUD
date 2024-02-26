import { useState, useEffect } from 'react';
import './index.css'
import { getStudents, addStudents, deleteStudent, editStudent } from './components/service';
import Students from './components/students';
import AddStudent from './components/addStudent';
import EditStudent from './components/EditStudent';

function App() {
  const [students, setStudents] = useState([]);
  const [showAddStudentForm, setshowAddStudentForm] = useState(false);
  const [refresh, setRefresh] = useState(false)
  const [showEditStudentForm, setshowEditStudentForm] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState();

  useEffect(() => {
    getStudents().then((students) => {
      setStudents(students);
    });
  }, [refresh]);

  const changeStudentName = () => {
    const newStudentList = students.map((student, index) => {
      if (index < 0) {
        student.name = "New name";
        student.rollNumber = "New rollNumber";
      } else {
        if (index > 0) {
          student.name = "New Student";
          student.rollNumber = "rollNumber"
        }
      }
      return student;
    });
    setStudents(newStudentList);
  };

  const ondeleteStudent = (rollNumber) => {
    deleteStudent(rollNumber).then(() => {
      setRefresh(!refresh)
    })
  }


  const onEditBtnClick = (student) => {
    editStudent(student).then(() => {
      setRefresh(!refresh)
      setshowEditStudentForm(false)
    })

  }
  const addNewStudent = () => {
    setshowAddStudentForm(true)
  }
  const onEditStudent = (student) => {
    setRefresh(!refresh);
    setStudentToEdit(student)
    setshowEditStudentForm(true)
  }
  const onBackclick = () => {
    setshowAddStudentForm(false)
  }

  const onBtnclick = (student) => {
    addStudents(student).then(() => {
      setRefresh(!refresh);
      setshowAddStudentForm(false)
    })
  }

  const renderApp = () => {
    if (showEditStudentForm) {
      return <EditStudent
        student={studentToEdit}
        onEditBackclick={() => {
          setshowEditStudentForm(false)
        }}
        onEditStudent={onEditStudent}
        onEditBtnClick={onEditBtnClick}
      />
    }
    if (showAddStudentForm) {
      return <AddStudent
        onBackclick={onBackclick}
        onBtnclick={onBtnclick}
      />
    }
    return <Students
      students={students}
      changeStudentName={changeStudentName}
      addNewStudent={addNewStudent}
      ondeleteStudent={ondeleteStudent}
      onEditStudent={onEditStudent}

    />
  }


  return (
    <div className='App' >
      {renderApp()}
    </div>
  );


}
export default App;