// including required packages
const express = require(`express`);

// configuring environment
const port = process.env.PORT || 1000;

// setting up application
let application = express();

application.get(`/`, (request, response) =>{
    response.sendFile(__dirname + `/static/index.html`)
})

application.use(express.static(__dirname + `/static`));

// launching server
application.listen(port, () => console.log(`\nserver is running on http://localhost:${port}/\n`));