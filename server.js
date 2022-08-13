// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
// Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
const { request, response } = require('express');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup the port
const port = 8000;
// Setup Server
const server = app.listen(port, (request, response)=> {
    console.log(`running on localhost: ${port}`);
});
// Setup get route  
app.get('/all', (request, response)=>{
    response.send(projectData);
})
// Setup post route
app.post('/all', (request, response)=> {
    newEntry = {
        date: request.body.date,
        temp: request.body.temp,
        feeling: request.body.feeling
    }
    projectData['date'] = request.body.date;
    projectData['temp'] = request.body.temp;
    projectData['feeling'] = request.body.feeling;
    
    response.send(projectData);
    console.log(projectData);
})