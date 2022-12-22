// Require the express module
const express = require('express');

const PORT = process.env.PORT || 5000

// Require the cors module, which allows for Cross-Origin Resource Sharing (CORS)
var cors = require('cors')

// Create an instance of the express app
const app = express();

// Use the express.json() middleware to parse JSON in the request body
app.use(express.json())

// Use the cors middleware to allow for CORS requests
app.use(cors())

// Use the /api/ route for all requests to the weather router
app.use('/api/', require('./routes/weather'))


if (process.env.NODE_ENV == "production") {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })

}



// Start the server and listen on port 5000
app.listen(PORT, () => {
console.log('Server listening on port', PORT);
});
