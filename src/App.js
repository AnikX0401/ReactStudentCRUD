import { useState, useEffect } from "react";
import "./index.css";
import {
  getStudents,
  addStudents,
  deleteStudent,
  editStudent,
} from "./components/service";
import { Route, Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Students from "./components/Students";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";

function App() {
  const [students, setStudents] = useState([]);
  const [showAddStudentForm, setshowAddStudentForm] = useState(false);
  const [showEditStudentForm, setshowEditStudentForm] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getStudents().then((res) => {
      if (res?.error === "failed") {
        setError(true);
      } else {
        setError(false);
        setStudents(res);
      }
    });
  });

  const ondeleteStudent = (rollNumber) => {
    if (window.confirm("Are you sure, you want to Delete this record?")) {
      deleteStudent(rollNumber).then(() => {});
    }
  };

  const onEditBtnClick = (student) => {
    editStudent(student).then(() => {
      setshowEditStudentForm(false);
      navigate("/");
    });
  };
  const addNewStudent = () => {
    setshowAddStudentForm(true);
  };
  const onEditStudent = (student) => {
    setStudentToEdit(student);
    setshowEditStudentForm(true);
  };
  const onBackclick = () => {
    setshowAddStudentForm(false);
  };

  const onBtnclick = (student) => {
    const expression = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!expression.test(student.email)) {
      window.confirm("Invalid Email Address");
      return;
    }
    addStudents(student).then(() => {
      setshowAddStudentForm(false);
      navigate("/");
    });
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
    } else if (showAddStudentForm) {
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
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link
              to="/"
              style={{ color: "#0C5DC7", padding: "5px", fontSize: "25px" }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/add"
              style={{ color: "#0C5DC7", padding: "5px", fontSize: "25px" }}
            >
              Add
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={renderApp()} />
        <Route
          path="/add"
          element={
            <AddStudent onBackclick={onBackclick} onBtnclick={onBtnclick} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
