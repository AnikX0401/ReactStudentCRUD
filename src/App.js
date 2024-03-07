import { useState, useEffect } from "react";
import "./index.css";
import {
  getStudents,
} from "./components/service";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Students from "./components/Students";

function App() {
  // const [students, setStudents] = useState([]);
  // const [refresh, setRefresh] = useState(false);
  // const [error, setError] = useState(false);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   getStudents().then((res) => {
  //     if (res?.error === "failed") {
  //       setError(true);
  //     } else {
  //       setError(false);
  //       setStudents(res);
  //     }
  //   });
  // }, [refresh]);

  // const ondeleteStudent = (rollNumber) => {
  //   if (window.confirm("Are you sure, you want to Delete this record?")) {
  //     deleteStudent(rollNumber).then(() => {
  //       setRefresh(!refresh);
  //     });
  //   }
  // };

  // const onEditStudent = (student) => {
  //   navigate(`/edit/${student.rollNumber}`)
  // };

  const renderApp = () => {
    
    return (
      <Students

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
      {renderApp()}
    </div>
  );
}

export default App;
