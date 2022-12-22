// Require the request module for making HTTP requests
const request = require('request');

// Require the express module
const express = require('express');

// Create a router instance for this route
const router = express.Router();

// Set the API key for the OpenWeatherMap API
//const API_KEY = "3ccefed46f1823e34344c01c1d92c129";
const API_KEY = process.env.API_KEY;

// Array of cities to get weather data for
const cities = ["London","Paris","New%20York","Moscow","Dubai","Tokyo","Singapore","Mumbai","Barcelona","Madrid","Rome","Doha","Chicago","Abu%20Dhabi","San%20Francisco","Amsterdam","Delhi","Toronto","Sydney","Berlin","Las%20Vegas","Washington%20DC","Istanbul","Vienna","Beijing","Prague","Milan","San%20Diego","Hong%20Kong","Melbourne"]      

// GET request for the /weather/page/:page route
router.get('/weather/page/:page', (req, res) => {
    // Get the page parameter from the request
    const page = req.params.page;
    
    // Set the number of cities per page
    const limit = 10;
    
    // Initialize an empty array to store the weather data for each city
    let result = []
    
    // Initialize an empty object to store the weather data for each city
    let newData = {}
    
    // Loop through the cities array and get the weather data for each city
    for (let index = limit*(page-1); index < limit*page; index++) {
    // Get the current city in the loop
    const element = cities[index];
    // Make a GET request to the OpenWeatherMap API to get the weather data for the current city
    request.get(`https://api.openweathermap.org/data/2.5/weather?q=${element}&appid=${API_KEY}`, (error, response, body) => {
    // If there is no error
    if (!error) {
      // Store the weather data for the current city in the newData object
      newData = {body}
      // Add the newData object to the result array
      result = [ ...result, newData ]
    }
  
    // If this is the last iteration of the loop
    if (index == (limit * page) - 1) {     
      // Send the result array as the response
      res.send(result)
    }
  });  
  
}
});

// Export the router so it can be used in other parts of the application
module.exports = router;