const controller = require('../controller');
const models = require('../../models/models'); 

jest.mock('../../models/models', () => ({
  askChatGPT: jest.fn(),
}));

//Testing controller for a valid question (should return answer from ChatGPT))

test('Should return answer when question is valid', async () => {
  const request = {
    body: {
      question: 'What is the final form of Charmander?',
    },
  };

  const reply = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  models.askChatGPT.mockResolvedValue('Charizard');

  await controller.askChatGPT(request, reply);

  expect(models.askChatGPT).toHaveBeenCalledWith('What is the final form of Charmander?');
  expect(reply.json).toHaveBeenCalledWith({ answer: 'Charizard' });
  expect(reply.status).not.toHaveBeenCalled(); // Nenhum erro deve ter ocorrido
});

// Testing controller for an invalid question (should return 400 error))

test('Should return 400 if no question is provided', async () => {
  const request = { body: {} }; 

  const reply = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await controller.askChatGPT(request, reply);

  expect(reply.status).toHaveBeenCalledWith(400); 
  expect(reply.json).toHaveBeenCalledWith({ error: 'Please enter a question' });
});

// Testing controller for a problem with OpenAI API

test('Should return 502 if external API returns error', async () => {
  const request = {
    body: {
      question: 'What is the final form of Charmander?',
    },
  };

  const reply = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  models.askChatGPT.mockRejectedValue({
    response: { status: 502, data: 'error details' },
  });

  await controller.askChatGPT(request, reply);

  expect(reply.status).toHaveBeenCalledWith(502);
  expect(reply.json).toHaveBeenCalledWith({
    error: 'Error from OpenAI API',
    details: 'error details',
  });
});

// Testing for unexpected error on server
test('Should return 500 if an unexpected error occurs', async () => {
  const request = {
    body: {
      question: 'What is the final form of Charmander?',
    },
  };

  const reply = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  models.askChatGPT.mockRejectedValue(new Error('Unexpected error'));

  await controller.askChatGPT(request, reply);

  expect(reply.status).toHaveBeenCalledWith(500); // Status 500
  expect(reply.json).toHaveBeenCalledWith({
    error: 'There was an error processing your request',
  });
});