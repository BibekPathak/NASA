const request =require('supertest')
const app= require('../../app')

describe('Test GET/launches', ()=>{
    test('It should respond with 200 success', async() => {
      const response=await request(app).get('/launches').expect(200).expect('content-type', /json/)
      //expect(response.statusCode).toBe(200);
    })
    
})

describe('Test POST/launches', ()=>{
    const completeLaunchData={
        mission: "hello",
        rocket:"ncc 1710",
        target: "kepler 1662-f",
        launchDate: "january 4, 2028"
    }

    const launchDataWithoutDate={
        mission: "hello",
        rocket:"ncc 1710",
        target: "kepler 1662-f",
    }

    const launchDataWithoutInvalidDate={
        mission: "hello",
        rocket:"ncc 1710",
        target: "kepler 1662-f",
        launchDate: "groot"
    }

    test('It should respond with 201 success', async() => {
        const response= await request(app).post('/launches').send(completeLaunchData).expect('content-type', /json/).expect(201)

        const requestDate= new Date(completeLaunchData.launchDate).valueOf()
        const responseDate= new Date(response.body.launchDate).valueOf()
        expect(responseDate).toBe(requestDate);

        expect(response.body).toMatchObject(launchDataWithoutDate)
      
    })

    test('It should catch missing required properties', async() => {
        const response= await request(app).post('/launches').send(launchDataWithoutDate).expect('content-type', /json/).expect(400)
        
        expect(response.body).toStrictEqual({
            Error: 'Missing required launch property!!'
        })
    });
    test('It should catch invalid dates',async()=>{
        const response= await request(app).post('/launches').send(launchDataWithoutInvalidDate).expect('content-type', /json/).expect(400)
        
        expect(response.body).toStrictEqual({
            Error: 'Invalid launch date!!'
        })
    });
    
    
})