const axios = require('axios');
require('dotenv').config();

const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
    console.error('OPENAI_API_KEY not found in environment variables');
    process.exit(1); 
}

async function askChatGPT(question) {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: `You are a Pokémon expert. Only answer questions about Pokémon. If the question is not about Pokémon, do not respond. ${question}` }],
        },
        {
        headers: {
            'Authorization': `Bearer ${openaiApiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.data.choices || response.data.choices.length === 0) {
        throw new Error('Unexpected response format from OpenAI API');
    }

    return response.data.choices[0].message.content;

} catch (error) {
    console.error('An error occurred while calling the ChatGPT API:', error);

    if (error.response) {

        throw new Error(`OpenAI API Error: ${error.response.status} - ${error.response.data.error.message}`);
    } else if (error.request) {

        throw new Error('No response received from OpenAI API');
    } else if (error.code === 'ECONNABORTED') {

        throw new Error('Request Timeout: Unable to connect to OpenAI API');
    } else if (error.message.includes('Network Error')) {

        throw new Error('Network Error: Failed to reach the OpenAI API');
    } else {

        throw new Error(`Request Error: ${error.message}`);
    }
}
}

module.exports = {askChatGPT};
