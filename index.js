require('dotenv').config();

const server = require('./api/server');

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
})
