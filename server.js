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

const databaseJSON = new DataStore({
    filename: path.join(__dirname, 'databaseJSON.db')
});
databaseJSON.loadDatabase();

// setup app and port //
const io = WebSocket(server);
const port = process.env.PORT || 8080;
const GeoLocateKey = process.env.API_KEY;
const staticPath = path.join(__dirname, '/public/');

// using public folder to server static web //
app.use(express.static(staticPath));

// web socket connection //
io.on('connection', (socket) => {

    // fetching user pubic ip //
    socket.on('user_ip', userIp => {
        database.insert({
            user_ip: userIp
        });

        // fetching data from nedb database //
        database.find( {}, (err, data) => {
            if (err) {
                console.log(`Error Found => ${err}`);
            } else {
                let db_ip = data[0].user_ip;
                socket.emit('db_user_ip', db_ip);

                // function to fetch data of ip_address //
                async function geoLocate(ip) {
                    const api = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${GeoLocateKey}&ip_address=${ip}`);
                    const jsonData = await api.json();
                    databaseJSON.insert(jsonData);
                }
                geoLocate(db_ip);
            }

            // fetching json data from database //
            databaseJSON.find( {}, (err, data) => {
                if (err) {
                    console.log(`Error Found => ${err}`);
                } else {
                    socket.emit('api_json_data', data[0]);
                }
            });
        });
    });

});

// express app routing //
app.get('/', (req, res) => {
    res.sendFile(path.join(staticPath,
        'index.html'));
});

// listening to express server //
server.listen(port, () => {
    console.log(chalk.red.bgBlue.bold(`http://127.0.0.1:${port}`));
});