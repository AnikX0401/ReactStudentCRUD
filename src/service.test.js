import { response } from "express";
import { addStudents, editStudent, getStudents } from "./components/service";

beforeEach(() => {
  // jest.restoreAllMocks();
});

describe("service", () => {
  global.fetch = jest.fn();
  describe("get students", () => {
    test("getStudents call the fetch with URL", async () => {
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue([]),
      });
      await getStudents();
      expect(fetch).toHaveBeenCalledWith("http://localhost:5555/students");
    });
  
    test("getStudents call the fetch and return error", async()=>{
    fetch.mockRejectedValue({
        json: jest.fn().mockResolvedValue([]),
      });

      const response = await getStudents();
      expect(fetch).toHaveBeenCalledWith("http://localhost:5555/students")
      expect(response).toStrictEqual({
        error: "failed"
      })
  })
});
});


describe("service", ()=>{
    describe("add student", ()=>{
test("addStudents should call the fetch and return students", async () => {
  var myHeaders = new Headers();
  const mockStudents = [
    {
      name: "rahul",
      rollNumber: 1,
      trainings: ["JAVA", "HTML"],
      email: "rahul21@gmail.com",
    },
  ];

  myHeaders.append("Content-Type", "application/json");
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(mockStudents),
  });

  const response = await addStudents(mockStudents[0]);
  expect(fetch).toHaveBeenCalledWith("http://localhost:5555/student", {
    headers: myHeaders,
    method: "POST",
    body: JSON.stringify(mockStudents[0]),
  });
  expect(response).toStrictEqual(mockStudents);
});
});
})

test("addStudents should call the fetch and return error", async () => {
  var myHeaders = new Headers();
  const mockStudent = {
    name: "rahul",
    rollNumber: 1,
    trainings: ["JAVA", "HTML"],
    email: "rahul21@gmail.com",
  };
  myHeaders.append("Content-Type", "application/json");
  fetch.mockRejectedValue({
    json: jest.fn().mockRejectedValue(),
  });

  const response = await addStudents(mockStudent);
  expect(fetch).toHaveBeenCalledWith("http://localhost:5555/student", {
    headers: myHeaders,
    method: "POST",
    body: JSON.stringify(mockStudent),
  });
  expect(response).toStrictEqual({
    error: "failed",
  });
});

describe("service component",()=>{
  describe("edit student", ()=>{
    test("edit students should call the fetch and edit students", async()=>{
      var myHeaders = new Headers();
      const mockStudent = [
        {
        name: "rahul",
        rollNumber: 1,
        trainings: ["JAVA", "HTML"],
        email: "rahul21@gmail.com",
      }
    ];
      myHeaders.append("Content-Type", "application/json");
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockStudent),
      });
      const response = await editStudent(mockStudent)
       expect(fetch).toHaveBeenCalledWith(`http://localhost:5555/student/${mockStudent.rollNumber}` , {
        redirect: "follow",
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(mockStudent),
       });

        expect(response).toStrictEqual(mockStudent)
    });
  });

  test("edit students should call the fetch and render error",async()=>{
    var myHeaders = new Headers();
    const mockStudent = [
      {
      name: "rahul",
      rollNumber: 1,
      trainings: ["JAVA", "HTML"],
      email: "rahul21@gmail.com",
    }
  ];
    myHeaders.append("Content-Type", "application/json");
    fetch.mockRejectedValue({
      json: jest.fn().mockRejectedValue(mockStudent),
    });
    const response = await editStudent(mockStudent)
     expect(fetch).toHaveBeenCalledWith(`http://localhost:5555/student/${mockStudent.rollNumber}` , {
      redirect: "follow",
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(mockStudent),
     });

      expect(response).toStrictEqual({
        error: "failed"
      })
  });

});
