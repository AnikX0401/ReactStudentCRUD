import React from "react";
import {
  fireEvent,
  getByRole,
  getByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import App from "./App";
import {
  addStudents,
  getStudents,
  deleteStudent,
  editStudent,
  getStudentByRollNumber,
} from "./components/service";
import { mockStudents } from "./mockStudents";

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

  it("renders HomePage", () => {
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
    window.history.pushState({}, "hello", "/");
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

  it("renders Edit Student form on edit click and edit student on save", async () => {
    window.history.pushState({}, "hello", "/");
    getStudentByRollNumber.mockResolvedValue({
      name: "rahul",
      rollNumber: 1,
      trainings: ["JAVA", "HTML"],
      email: "rahul21@gmail.com",
    });
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("manish21@gmail.com")).toBeInTheDocument();
      //expect(screen.getByText(1)).toBeInTheDocument();
    });
    fireEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);
    await waitFor(() => {
      screen.getByLabelText("name:");
    });

    const rollNumberInput = screen.getByLabelText("rollNumber:");
    expect(rollNumberInput).toBeDisabled();

    fireEvent.change(
      screen.getByRole("textbox", {
        name: /name:/i,
      }),
      { target: { value: "New name" } }
    );

    fireEvent.change(
      screen.getByRole("textbox", {
        name: /trainings:/i,
      }),
      { target: { value: "JAVA, HTML, CSS" } }
    );

    editStudent.mockResolvedValue();

    fireEvent.click(screen.getByText("Save"));
    const save = screen.getByRole("button", {
      name: /save/i,
    });
    fireEvent.click(save);

    expect(editStudent).toHaveBeenCalledWith({
      name: "New name",
      rollNumber: 1,
      trainings: ["JAVA", "HTML", "CSS"],
    });
    expect(getStudentByRollNumber).toHaveBeenCalled();
  });

  it("filter students on search input", async () => {
    window.history.pushState({}, "hello", "/");
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
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText("enter text here.."), {
      target: { value: "rahul" },
    });
    await waitFor(() => {
      expect(screen.getByText("rahul")).toBeInTheDocument();
      expect(screen.queryByText("manish")).not.toBeInTheDocument();
      expect(screen.queryByText("rohit")).not.toBeInTheDocument();
    });
    fireEvent.change(screen.getByPlaceholderText("enter text here.."), {
      target: { value: "" },
    });
    await waitFor(() => {
      expect(screen.getByText("rahul")).toBeInTheDocument();
      expect(screen.getByText("manish")).toBeInTheDocument();
      expect(screen.getByText("rohit")).toBeInTheDocument();
    });
    fireEvent.change(screen.getByPlaceholderText("enter text here.."), {
      target: { value: "2" },
    });
    await waitFor(() => {
      expect(screen.queryByText("rahul")).not.toBeInTheDocument();
      expect(screen.getByText("manish")).toBeInTheDocument();
      expect(screen.queryByText("rohit")).not.toBeInTheDocument();
    });
    fireEvent.change(screen.getByPlaceholderText("enter text here.."), {
      target: { value: "" },
    });
    await waitFor(() => {
      expect(screen.getByText("rahul")).toBeInTheDocument();
      expect(screen.getByText("manish")).toBeInTheDocument();
      expect(screen.getByText("rohit")).toBeInTheDocument();
    });
  });

  it("renders pagination buttons and changes page numbers", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("rahul")).toBeInTheDocument();
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /next/i,
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /previous/i,
      })
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: /1/i,
      })
    );
  });

  it("renders previous button disabled on first page", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("rahul")).toBeInTheDocument();
    });
    expect(
      screen.getByRole("button", {
        name: /previous/i,
      })
    ).toBeDisabled();
  });

  it("renders total students records based on set pagesize and next click", async () => {
    getStudents.mockResolvedValue(mockStudents);

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("rahul")).toBeInTheDocument();
    });

    for (let i = 1; i <= 10; i++) {
      expect(screen.getByText(mockStudents[i - 1].name)).toBeInTheDocument();
    }

    fireEvent.click(
      screen.getByRole("button", {
        name: /next/i,
      })
    );

    for (let i = 11; i <= 20; i++) {
      expect(screen.getByText(mockStudents[i - 1].name)).toBeInTheDocument();
    }
  });

  it("should highlight when trainings found of name JAVA", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("rahul")).toBeInTheDocument();
    });
    const studentRow = await screen.findAllByRole("row");
    studentRow.forEach((student) => {
      if (student.textContent.includes("JAVA")) {
        expect(student).toHaveStyle("background-color: yellow");
      } else {
        expect(student).not.toHaveStyle("background-color: yellow");
      }
    });
  });
});
