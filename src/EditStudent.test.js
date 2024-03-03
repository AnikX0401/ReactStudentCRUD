import { fireEvent, render, screen } from "@testing-library/react";
import EditStudent from "./components/EditStudent";

const mockonEditBackClick = jest.fn();
const mockOnEditBtnClick = jest.fn();

const Mockstudents = [
    {
        name: 'rahul123',
        "rollNumber": 1,
        trainings: ['JAVA', 'HTML'],
        email: 'rahul21@gmail.com'
    },
    {
        name: 'manish',
        "rollNumber": 2,
        trainings: ['JAVA', 'HTML'],
        email: 'manish21@gmail.com'
    },
    {
        name: 'rohit',
        "rollNumber": 3,
        trainings: ['HTML'],
        email: 'rohit77@gmail.com'

    }];

afterEach(() => {
    jest.resetAllMocks();
});

test('renders the editStudent component with values', () => {
    render(<EditStudent
        onEditBackClick={mockonEditBackClick}
        student={Mockstudents[0]}
        mockOnEditBtnClick={mockOnEditBtnClick}
    />)
    const nameInput = screen.getByLabelText("name:")
    expect(nameInput).toHaveValue(Mockstudents[0].name)
    //    const rollnoInput = screen.getByLabelText("rollNumber:")
    //    expect(rollnoInput).toHaveValue(Mockstudents[0].rollNumber.toString());


    // const trainingsInput = screen.getByLabelText("trainings:")
    // expect(trainingsInput).toHaveValue(Mockstudents[0].trainings);
});

test("initially renders disabled roll number", () => {
    render(<EditStudent
        onEditBackClick={mockonEditBackClick}
        student={Mockstudents[0]}
        mockOnEditBtnClick={mockOnEditBtnClick} />)
    const rollNumberInput = screen.getByLabelText("rollNumber:")
    expect(rollNumberInput).toBeDisabled();

    screen.logTestingPlaygroundURL();
})

test("renders the saved values on save button click", () => {
    render(<EditStudent
        onEditBackClick={mockonEditBackClick}
        student={Mockstudents[0]}
        onEditBtnClick={mockOnEditBtnClick} />)
    const saveBtn = screen.getByRole('button', {
        name: /save/i
    })
    const nameInput = screen.getByRole('textbox', {
        name: /name:/i
    })
    const trainingsInput = screen.getByRole('textbox', {
        name: /trainings:/i
    })
    fireEvent.change(trainingsInput, {
        target: {
            value: "skill1, skill2"
        }
    })
    fireEvent.change(nameInput, {
        target: {
            value: "rahul1234"
        }
    })
    fireEvent.click(saveBtn)
    expect(mockOnEditBtnClick).toHaveBeenCalledWith({ "name": "rahul1234", "rollNumber": 1, "trainings": ["skill1", "skill2"] });
}
)
