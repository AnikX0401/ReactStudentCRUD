// import React from "react";
// import { render, screen, waitFor } from "@testing-library/react";
// import App from "./App";
// import * as service from "./components/service";
// import { Router } from "express";

// jest.mock("./components/service");

// test("render students data on fetching", async () => {
//   const serviceStudents = service.getStudents
//   service.getStudents.mockResolvedValue([
//     {
//       name: "rahul",
//       rollNumber: 1,
//       trainings: ["JAVA", "HTML"],
//       email: "rahul21@gmail.com",
//     },
//     {
//       name: "manish",
//       rollNumber: 2,
//       trainings: ["JAVA", "HTML"],
//       email: "manish21@gmail.com",
//     },
//     {
//       name: "rohit",
//       rollNumber: 3,
//       trainings: ["HTML"],
//       email: "rohit77@gmail.com",
//     },
//   ]);

//   const component = render(<Router>
//   <App />
//   </Router>
//   );

//   await waitFor(() => {
//     expect(getByText("Name")).toBeInTheDocument();
//     expect(getByText(/Trainings/i)).toBeInTheDocument();
//     expect(getByText(/Email/i)).toBeInTheDocument();
//     // service.getStudents.forEach((student)=>{
//     //   screen.getByText(student.name);
//     //   screen.getByText(student.rollNumber.toString())
//     //   // screen.getByTestId(student.trainings)
//     //   screen.getByText(student.email)
//   });
//   expect(component.asFragment()).toMatchSnapshot();

//   screen.logTestingPlaygroundURL();
// }); 

// test("renders error message when students data is not fetched", async () => {
//   service.getStudents.mockResolvedValue({ error: "failed" });

//   render(<Router>
//   <App />
//   </Router>
//   );

  
//   await waitFor(() => {
//     expect(
//       screen.getByText("Failed to load Students Data")
//     ).toBeInTheDocument();
//   });
// });

// // it('checkif the students renders from the api', async()=>{
// //   global.fetch = jest.fn().mockResolvedValue({
// //     json: jest.fn().mockResolvedValue({ students: [{
// //       name: 'rahul',
// //       "rollNumber": 1,
// //       trainings: ['JAVA', 'HTML'],
// //       email : 'rahul21@gmail.com'
// //   },
// //   {
// //       name: 'manish',
// //       "rollNumber": 2,
// //       trainings: ['JAVA', 'HTML'],
// //       email : 'manish21@gmail.com'
// //   }] }),
// //   });

// //   render(<App />);
// //   await waitFor(()=>{
// //     screen.getByText("roll Number")
// //   })
// //   expect(global.fetch).toHaveBeenCalledWith("http://localhost:5555/students");
// // });





import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom"; // Adjust the router import

import App from "./App";
import * as service from "./components/service";

jest.mock("./components/service");

afterEach(() => {
  jest.clearAllMocks();
});

test("render students data on fetching", async () => {
  service.getStudents.mockResolvedValue([
    {
      name: "rahul",
      rollNumber: 1,
      trainings: ["JAVA", "HTML"],
      email: "rahul21@gmail.com",
    },
    {
      name: "manish",
      rollNumber: 2,
      trainings: ["JAVA", "HTML"],
      email: "manish21@gmail.com",
    },
    {
      name: "rohit",
      rollNumber: 3,
      trainings: ["HTML"],
      email: "rohit77@gmail.com",
    },
  ]);

 const {asFragment}= render(
    <Router>
      <App />
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText("Name")).toBeInTheDocument();
    // Add more specific selectors for other elements
    expect(screen.getByText("Trainings")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    // screen.debug(); // Uncomment for debugging
  });

  // expect(screen.getByText(/rahul/i)).toBeInTheDocument(); // Example check for a specific student name
  // expect(screen.asFragment()).toMatchSnapshot();
  const rahulElements = screen.getAllByText(/rahul/i);
  expect(rahulElements.length).toBe(2);

  const EmailElements = screen.getAllByText(/rohit77@gmail.com/i);
  expect(EmailElements.length).toBe(1);

  expect(asFragment()).toMatchSnapshot();
});

test("renders error message when students data is not fetched", async () => {
  service.getStudents.mockResolvedValue({ error: "failed" });

  render(
    <Router>
      <App />
    </Router>
  );

  await waitFor(() => {
    expect(
      screen.getByText("Failed to load Students Data")
    ).toBeInTheDocument();
    // screen.debug(); // Uncomment for debugging
  });
});

