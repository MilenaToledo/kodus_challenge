const { validateRequest } = require('../middlewares'); 
const httpMocks = require('node-mocks-http'); 


//Testing question validation 

describe('Testing validation middleware', () => {
  it('Should return 400 for invalid question', () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        question: '  ' 
      }
    });
    const res = httpMocks.createResponse();
    const nextMock = jest.fn();  //mock

    validateRequest(req, res, nextMock);

    expect(res.statusCode).toBe(400);
    expect(res._getData()).toBe(JSON.stringify({ error: 'Please enter a valid question' }));
  });

  it('Should return 400 for random meaningless string', () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        question: '%%%&&'  
      }
    });
    const res = httpMocks.createResponse();
    const nextMock = jest.fn();

    validateRequest(req, res, nextMock);

    expect(res.statusCode).toBe(400); 
    expect(res._getData()).toBe(JSON.stringify({ error: 'Please enter a meaningful question, not a random string' }));
  });

  it('calls next() for valid questions', () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        question: 'What is the final evolution of Charmander?', 
      }
    });
    const res = httpMocks.createResponse();
    const nextMock = jest.fn(); 

    validateRequest(req, res, nextMock);  

    expect(nextMock).toHaveBeenCalled(); 
  });
});
