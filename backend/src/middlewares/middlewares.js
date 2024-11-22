
const isRandomString = (str) => {
  
  const nonAlphanumericPattern = /^[^a-zA-Z0-9 ]+$/;
  
  
  if (str.length > 2 && nonAlphanumericPattern.test(str)) {
    return true;  
  }

  const words = str.split(/\s+/);
  const validWords = words.filter(word => word.length > 2 && /^[a-zA-Z]+$/.test(word)); 
  return validWords.length < 2; 
};

function validateRequest(req, res, next) {
  const { question } = req.body;


  if (!question || question.trim().length < 3 || question === "-") {
    return res.status(400).json({ error: 'Please enter a valid question' });
  }

  if (isRandomString(question)) {
    return res.status(400).json({ error: 'Please enter a meaningful question, not a random string' });
  }

  next();
}

module.exports = { validateRequest };