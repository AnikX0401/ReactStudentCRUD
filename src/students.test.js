import React from "react";
import Students from "./components/students";
import { render, waitFor } from "@testing-library/react";


const server = setServer(
    rest.get('http://localhost:5555/students', (req,res,ctx) => {
        return res(
            ctx.status(200),
            ctx.json([{
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
            
            }])
            
        )
    })
)
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Student Component', ()=>{
    it('renders data fetched from student data server', async()=>{
        render(<Students />)
        await waitFor(()=>{
      expect(screen.getByText(/Name/i)).toBeInTheDocument();
        })
    })
})


