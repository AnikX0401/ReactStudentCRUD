import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { addStudents, getStudents } from "./components/service";

jest.mock("./components/service", () => {
  return {
    getStudents: jest.fn(),
    addStudents: jest.fn(),
  };
});

describe("Students app", () => {
  beforeEach(() => {
    getStudents.mockResolvedValue([
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
  });

  it("render students data on fetching", async () => {
    const { asFragment } = render(
      <Router>
        <App />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders error message when students data is not fetched", async () => {
    getStudents.mockResolvedValue({ error: "failed" });

    render(
      <Router>
        <App />
      </Router>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Failed to load Students Data")
      ).toBeInTheDocument();
    });
  });

  

  it("renders error message on duplicate email", async () => {
    addStudents.mockResolvedValue({
      error: "Email address already exist..!",
    });

    render(
      <Router>
        <App />
      </Router>
    );
    const addBtn = screen.getByRole("button", {
      name: /add new student/i,
    });
    fireEvent.click(addBtn);
    await waitFor(() => {
       screen.getByLabelText("name:");
    });
    fireEvent.change(
      screen.getByRole("textbox", {
        name: /name:/i,
      }),
      { target: { value: "name" } }
    );
    fireEvent.change(
      screen.getByRole("textbox", {
        name: /rollNumber:/i,
      }),
      { target: { value: "4" } }
    );
    fireEvent.change(
      screen.getByRole("textbox", {
        name: /trainings:/i,
      }),
      { target: { value: "HTML" } }
    );
    fireEvent.change(
      screen.getByRole("textbox", {
        name: /email:/i,
      }),
      { target: { value: "email@gmail.com" } }
    );

    const saveBtn = screen.getByRole('button', {
      name: /add/i
    })
    fireEvent.click(saveBtn)
    await waitFor(() => {
       screen.getByText("Hey duplicate email id");
    });
  });

  it("renders error message on duplicate email", async () => {
    addStudents.mockResolvedValue({
      error: "Email address already exist..!",
    });

    render(
      <Router>
        <App />
      </Router>
    );
    const addBtn = screen.getByRole("button", {
      name: /add new student/i,
    });
    fireEvent.click(addBtn);
    await waitFor(() => {
       screen.getByLabelText("name:");
    });
    screen.logTestingPlaygroundURL();
    fireEvent.change(
      screen.getByRole("textbox", {
        name: /name:/i,
      }),
      { target: { value: "name" } }
    );
    fireEvent.change(
      screen.getByRole("textbox", {
        name: /rollNumber:/i,
      }),
      { target: { value: "4" } }
    );
    fireEvent.change(
      screen.getByRole("textbox", {
        name: /trainings:/i,
      }),
      { target: { value: "HTML" } }
    );
    fireEvent.change(
      screen.getByRole("textbox", {
        name: /email:/i,
      }),
      { target: { value: "email@gmail.com" } }
    );

    const saveBtn = screen.getByRole('button', {
      name: /add/i
    })
    fireEvent.click(saveBtn)
    await waitFor(() => {
       screen.getByText("Hey duplicate email id");
    });
  });
})

