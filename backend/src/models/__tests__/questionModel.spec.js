const { askChatGPT } = require('../models');
const axios = require('axios'); 
jest.mock('axios');


// Testing ChatGPT response
describe('Testing model', () => {
  it('should return valid answer', async () => {
    const mockResponse = {
      data: {
        choices: [
          { message: { content: 'Pikachu is an eletric Pokémon' } }
        ]
      }
    };

    // Simulating suscessful response from axios
    axios.post.mockResolvedValue(mockResponse);

    const question = 'What is Pikachu?';
    const response = await askChatGPT(question);

    expect(response).toBe('Pikachu is an eletric Pokémon');  
  });

  it('should throw error for wrong response format', async () => {
    const mockResponse = {
      data: { choices: [] } 
    };

    axios.post.mockResolvedValue(mockResponse);

    const question = 'What is Pikachu?';
    
    await expect(askChatGPT(question)).rejects.toThrow('Unexpected response format from OpenAI API');
  });

  it('hould throw error for bad calls to the API', async () => {
    axios.post.mockRejectedValue(new Error('Error calling API'));

    const question = 'What is Pikachu?';

    await expect(askChatGPT(question)).rejects.toThrow('Request Error: Error calling API');
  });
});
