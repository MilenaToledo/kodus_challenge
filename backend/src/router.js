const express = require('express');
const router = express.Router();
const controller = require('./controllers/controller');


const { validateRequest } = require('./middlewares/middlewares');
router.post('/ask', validateRequest, controller.askChatGPT);

module.exports = router;
