const app = require ('./app')
require('dotenv').config()

const port = process.env.PORT 

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`API documentation available at http://localhost:${port}/api-docs`);
  });