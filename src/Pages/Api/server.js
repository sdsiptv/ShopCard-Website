const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 443; // Default HTTPS port

// Serve static files from the React app build
app.use(express.static(path.join(__dirname, 'build')));

// Send all routes to the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Read SSL certificate files
const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
};

// Start HTTPS server
https.createServer(options, app).listen(PORT, () => {
  console.log(`HTTPS server running on port ${PORT}`);
});
