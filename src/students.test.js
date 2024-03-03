import React from "react";
import { render, screen } from "@testing-library/react";
import Students from "./components/students";

// import { rest } from "msw";
// import { setServer } from "msw/node";
    const Mockstudents = [
        {
        name: 'rahul',
        "rollNumber": 1,
        trainings: ['JAVA', 'HTML'],
        email : 'rahul21@gmail.com'
    },
    {
        name: 'manish',
        "rollNumber": 2,
        trainings: ['JAVA', 'HTML'],
        email : 'manish21@gmail.com'
    },
    {
        name: 'rohit',
        "rollNumber": 3,
        trainings: ['HTML'],
        email : 'rohit77@gmail.com'
    
    }];

    const MockAddNewStudent = jest.fn();
    const MockchangeStudentName = jest.fn();
    const MockondeleteStudent = jest.fn();
    const MockonEditStudent = jest.fn();

    afterEach(()=>{
      jest.resetAllMocks();
    });

    test('renders the students table with headers', ()=>{
      render(<Students
        students={[]}
        addNewStudent={MockAddNewStudent}
        changeStudentName={MockchangeStudentName}
        ondeleteStudent={MockondeleteStudent}
        onEditStudent={MockonEditStudent} />);
      
        const headers = screen.getAllByRole('columnheader');
        expect(headers).toHaveLength(5)
        expect(headers[0]).toHaveTextContent('Name');
        expect(headers[1]).toHaveTextContent('Roll Number');
        expect(headers[2]).toHaveTextContent('Trainings');
        expect(headers[3]).toHaveTextContent('Email');
        expect(headers[4]).toHaveTextContent('Actions');
    });

    test('renders correct students details', ()=>{
      render(<Students
        students={Mockstudents}
        addNewStudent={MockAddNewStudent}
        changeStudentName={MockchangeStudentName}
        ondeleteStudent={MockondeleteStudent}
        onEditStudent={MockonEditStudent} />);

        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(Mockstudents.length +1);

        Mockstudents.forEach((student)=>{
          screen.getByText(student.name);
          screen.getByText(student.rollNumber.toString())
          // screen.getByTestId(student.trainings)
          screen.getByText(student.email)

          screen.logTestingPlaygroundURL();
        })

    });



//     render(<Students students={students} />);

//     expect(screen.getByText('rahul')).toBeInTheDocument();
//     expect(screen.getByText('1')).toBeInTheDocument();
//     expect(screen.getByText('rahul21@gmail.com')).toBeInTheDocument();
// })








