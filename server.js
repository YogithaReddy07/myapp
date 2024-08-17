const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;
const WINDOW_SIZE = 10;
let numberWindow = [];

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/numbers/:numberid', async (req, res) => {
    const numberid = req.params.numberid;
    const thirdPartyAPI = 'https://third-party-api.com/${numberid};'
    
    let windowPrevState = [...numberWindow];
    
    try {
        const response = await axios.get(thirdPartyAPI, { timeout: 500 });
        const numbers = response.data.numbers; // Assuming API returns an array of numbers
        
        // Ensure uniqueness and add to sliding window
        numbers.forEach(num => {
            if (!numberWindow.includes(num)) {
                if (numberWindow.length >= WINDOW_SIZE) {
                    numberWindow.shift(); // Remove oldest number
                }
                numberWindow.push(num);
            }
        });
        
        let avg = numberWindow.reduce((sum, num) => sum + num, 0) / numberWindow.length;
        
        res.json({
            windowPrevState: windowPrevState,
            windowCurrState: numberWindow,
            numbers: numbers,
            avg: avg.toFixed(2)
        });
    } catch (error) {
        console.error("Failed to fetch data:", error.message);
        res.status(500).send("Error fetching numbers from third-party API.");
    }
});

app.listen(port, () => {
    console.log('Average Calculator Microservice running on http://localhost:${port}');
});