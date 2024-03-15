import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import {
  addStudents,
  getStudents,
  deleteStudent,
  editStudent,
  getStudentByRollNumber,
} from "./components/service";

jest.mock("./components/service", () => {
  return {
    getStudents: jest.fn(),
    addStudents: jest.fn(),
    deleteStudent: jest.fn(),
    editStudent: jest.fn(),
    getStudentByRollNumber: jest.fn(),
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
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders error message when students data is not fetched", async () => {
    getStudents.mockResolvedValue({ error: "failed" });

    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText("Failed to load Students Data")
      ).toBeInTheDocument();
    });
  });

  fit("renders HomePage", () => {
    render(<App />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("renders error message on duplicate email", async () => {
    addStudents.mockResolvedValue({
      error: "Email address already exist..!",
    });

    render(<App />);

    const addBtn = screen.getByRole("link", {
      name: /add/i,
    });

    fireEvent.click(addBtn);
    await waitFor(() => {
      screen.getByLabelText("name:");
    });
    fireEvent.change(
      screen.getByRole("textbox", {
        name: /name:/i,
      }),
      { target: { value: "name789" } }
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
      { target: { value: "HTML, CSS" } }
    );
    fireEvent.change(
      screen.getByRole("textbox", {
        name: /email:/i,
      }),
      { target: { value: "email@gmail.com" } }
    );
    const saveBtn = screen.getByRole("button", {
      name: /add/i,
    });

    screen.logTestingPlaygroundURL();
    fireEvent.click(saveBtn);
    await waitFor(() => {
      screen.getByText("Hey duplicate email id");
    });
    expect(addStudents).toHaveBeenCalledWith({
      email: "email@gmail.com",
      name: "name789",
      rollNumber: 4,
      trainings: ["HTML", "CSS"],
    });
  });

  it("deletes a student on clicking delete button", async () => {
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

    deleteStudent.mockResolvedValue();
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("rahul")).toBeInTheDocument();
    });
    window.confirm = jest.fn().mockImplementation(() => true);

    fireEvent.click(screen.getAllByRole("button", { name: /delete/i })[0]);

    expect(window.confirm).toHaveBeenCalledWith(
      "Are you sure, you want to Delete this record?"
    );
    expect(deleteStudent).toHaveBeenCalledWith(1);
    expect(getStudents).toHaveBeenCalled();
  });

  it("renders Edit form with values", async () => {
    getStudentByRollNumber.mockResolvedValue([
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
    ]);
    render(<App />);

    const nameInput = screen.getByLabelText("name:");
    const rollNumberInput = screen.getByLabelText("rollNumber:");
    const trainingsInput = screen.getByLabelText("trainings:");
    const saveButton = screen.getByText("Save");

    await waitFor(() => {
      expect(nameInput).toHaveValue("rahul");
      expect(trainingsInput).toHaveValue("CSS");
    });
    expect(rollNumberInput).toBeDisabled();

    fireEvent.change(nameInput, { target: { value: "rahul" } });
    fireEvent.change(trainingsInput, { target: { value: "CSS" } });

    expect(nameInput).toHaveValue("rahul");
    expect(trainingsInput).toHaveValue("CSS");
    fireEvent.click(saveButton);
    await waitFor(() => {
      expect(editStudent).toHaveBeenCalledWith({
        name: "rahul",
        trainings: ["CSS"],
      });
    });
  });
});
