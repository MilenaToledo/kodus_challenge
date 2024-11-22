const models = require('../models/models'); 


const askChatGPT = async (req, res) => {

    try {
        const { question } = req.body;
        if (!question) {
          return res.status(400).json({ error: 'Please enter a question' });
        }
        const answer = await models.askChatGPT(question);
        res.json({ answer });
      } catch (error) {
        console.error('Error details:', error);
        if (error.response) {

            return res.status(error.response.status).json({ error: 'Error from OpenAI API', details: error.response.data });
        }
        
        res.status(500).json({ error: 'There was an error processing your request' });
    }
};

module.exports = { askChatGPT };