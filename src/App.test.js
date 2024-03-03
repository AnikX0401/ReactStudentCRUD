import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import * as service from "./components/service";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

jest.mock("./components/service");

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
  const component = render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Trainings/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
  });
  expect(component.asFragment()).toMatchSnapshot();

  screen.logTestingPlaygroundURL();
});

test("renders error message when students data is not fetched", async () => {
  service.getStudents.mockResolvedValue({ error: "failed" });

  render(<App />);

  await waitFor(() => {
    expect(
      screen.getByText("Failed to load Students Data")
    ).toBeInTheDocument();
  });
});

// it('checkif the students renders from the api', async()=>{
//   global.fetch = jest.fn().mockResolvedValue({
//     json: jest.fn().mockResolvedValue({ students: [{
//       name: 'rahul',
//       "rollNumber": 1,
//       trainings: ['JAVA', 'HTML'],
//       email : 'rahul21@gmail.com'
//   },
//   {
//       name: 'manish',
//       "rollNumber": 2,
//       trainings: ['JAVA', 'HTML'],
//       email : 'manish21@gmail.com'
//   }] }),
//   });

//   render(<App />);
//   await waitFor(()=>{
//     screen.getByText("roll Number")
//   })
//   expect(global.fetch).toHaveBeenCalledWith("http://localhost:5555/students");
// });

// test('renders buttons and table headings on UI', () => {
//   render(<App />);

//   const tableHeadings = ['Name', 'Roll Number', 'Trainings', 'Email', 'Actions'];
//   tableHeadings.forEach((heading) => {
//     expect(screen.getByText(heading)).toBeInTheDocument();
//   });
//   expect(screen.getByText('Add New Student')).toBeInTheDocument();
//   expect(screen.getByText('Change New Student')).toBeInTheDocument();
// });
