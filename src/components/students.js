import { useEffect, useState } from "react";
import { deleteStudent, getStudents } from "./service";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const [studentState, setStudents] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentStudents, setCurrentStudents] = useState([]);
  const navigate = useNavigate();
  const onEditStudent = (student) => {
    navigate(`/edit/${student.rollNumber}`);
  };
  function getStudentsList() {
    getStudents().then((res) => {
      if (res?.error === "failed") {
        setError(true);
      } else {
        setStudents(res);
        setError(false);
      }
    });
  }
  useEffect(() => {
    getStudentsList();
  }, []);

  useEffect(() => {
    console.log("called empty useeffect");
  }, []);
  useEffect(() => {
    const filteredList = studentState.filter(
      (student) =>
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        `${student.rollNumber}`.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredStudents(filteredList);
    setCurrentPage(1);
    console.log("Filter Students::");
  }, [studentState, search]);

  useEffect(() => {
    const pages = Math.ceil(studentState.length / pageSize);
    setTotalPages(pages);
  }, [pageSize, studentState]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentStudents = filteredStudents.slice(startIndex, endIndex);
    setCurrentStudents(currentStudents);
  }, [currentPage, filteredStudents, pageSize]);

  console.log("rendering Students");
  const onDeleteStudent = (rollNumber) => {
    if (window.confirm("Are you sure, you want to Delete this record?")) {
      deleteStudent(rollNumber).then(() => {
        getStudentsList();
      });
    }
  };
  if (error) {
    return <h2>Failed to load Students Data</h2>;
  }
  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const handlePageSize = (size) => {
    setTotalPages(size);
    setPageSize(size);
    setCurrentPage(1);
  };

  const renderPages = () => {
    const pageElements = [];
    for (let i = 1; i <= totalPages; i++) {
      const button = (
        <button
          onClick={() => {
            setCurrentPage(i);
          }}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
      pageElements.push(button);
    }
    return pageElements;
  };

  const rowBackgroundColor = (student) => {
    return student.trainings.includes("JAVA") ? "yellow" : "white";
  };

  return (
    <div className="student-list">
      <h1>Students</h1>
      <input
        type="text"
        placeholder="enter text here.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <button onClick={() => setSearch(search)}>Search</button>
      {!filteredStudents.length && search && <h2>No data found!</h2>}
      <p>Total Students: {filteredStudents.length}</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Trainings</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 &&
            currentStudents.map((student, index) => (
              <tr
                key={`${student?.email}_${index}`}
                data-testid="student-row"
                style={{ backgroundColor: rowBackgroundColor(student) }}
              >
                <td>{student.name}</td>
                <td>{student.rollNumber}</td>
                <td>
                  {student?.trainings?.length && student.trainings.join(",  ")}
                </td>
                <td>{student.email}</td>
                <td>
                  <button
                    onClick={() => {
                      onDeleteStudent(student.rollNumber);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      onEditStudent(student);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="pagination-buttons">
        <button onClick={handlePrevClick} disabled={currentPage === 1}>
          Previous
        </button>
        {renderPages()}
        <button
          onClick={handleNextClick}
          disabled={
            currentPage === Math.ceil(filteredStudents.length / pageSize)
          }
        >
          Next
        </button>
      </div>
      <select
        onChange={(e) => {
          handlePageSize(e.target.value);
        }}
      >
        <option value={"10"}>10</option>
        <option value={"20"}>20</option>
        <option value={"30"}>30</option>
      </select>
      Paged: {totalPages}
    </div>
  );
};
export default Students;
