// NPM Packages //
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const DataStore = require('nedb');
const chalk = require('chalk');
const path = require('path');
const fetch = require('node-fetch');
const WebSocket = require('socket.io');
require('dotenv').config();

// NEDB lite weight database //
const database = new DataStore({
    filename: path.join(__dirname, 'database.db')
});
database.loadDatabase();

// setup app and port //
const io = WebSocket(server);
const port = process.env.PORT || 8080;
const GeoLocateKey = process.env.API_KEY;
const staticPath = path.join(__dirname, '/public/');

// using public folder to server static web //
app.use(express.static(staticPath));

// function to fetch user public ip //
async function userIp() {
    let api = await fetch('https://api.ipify.org?format=json');
    let jsonData = await api.json();
    database.insert({
        userIp: jsonData
    });
}
// userIp();

// web socket connection //
io.on('connection' , (socket) => {
    
});

// express app routing //
app.get('/', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

// listening to express server 
server.listen(port, () => {
    console.log(chalk.red.bgBlue.bold(`http://127.0.0.1:${port}`));
});