import { render, screen, waitFor } from '@testing-library/react';
import Students from './components/students';
import { getStudents } from './components/service';


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

jest.mock('./components/service', ()=>({
  getStudents: jest.fn(),
}));
describe('Students component', ()=>{
  const mockedStudents = [{
    name: 'rahul',
    "rollNumber": 1,
    address: {
        city: 'Pune',
        zipcode: 411037
    },
    trainings: ['JAVA', 'HTML'],
    level: 'Intermediate',
    email : 'rahul21@gmail.com'
},
{
    name: 'manish',
    "rollNumber": 2,
    address: {
        city: 'Pune',
        zipcode: 411037
    },
    trainings: ['JAVA', 'HTML'],
    level: 'Basic',
    email : 'manish21@gmail.com'
},
{
    name: 'rohit',
    "rollNumber": 3,
    address: {
        city: 'Pune',
        zipcode: 411037
    },
    trainings: ['HTML'],
    level: 'Advance',
    email : 'rohit77@gmail.com'

}];

beforeEach(()=>{
  getStudents.mockReset();
})
  it('renders students data in table', async()=>{
    render(<Students />);
  getStudents.mockResolvedValue(mockedStudents);
  
  await waitFor(()=>{
    // expect(screen.getByText(/Name/i)).toBeInTheDocument();
    // expect(screen.getByText(/RollNumber/i)).toBeInTheDocument();
    // expect(screen.getByText(/Trainings/i)).toBeInTheDocument();
    // expect(screen.getByText(/Email/i)).toBeInTheDocument();
    mockedStudents.forEach((student)=>{
      const studentsTable = screen.getByText(student.name);
      expect(studentsTable).toBeInTheDocument();
      const studentsTablerow2 = screen.getByText(student.rollNumber);
      expect(studentsTablerow2).toBeInTheDocument();
      const studentsTablerow3 = screen.getByText(student.trainings);
      expect(studentsTablerow3).toBeInTheDocument();
      const studentsTablerow4 = screen.getByText(student.email);
      expect(studentsTablerow4).toBeInTheDocument();

    });

  });
  })
   
})
