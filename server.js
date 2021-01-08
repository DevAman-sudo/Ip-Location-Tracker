const express = require('express');
const app = express();
const server = require('http').createServer(app);
const DataStore = require('nedb');
const chalk = require('chalk');
const path = require('path');
const fetch = require('node-fetch');
const WebSocket = require('socket.io');
require('dotenv');

const database = new DataStore({ filename: path.join( __dirname , 'database.db' ) });
database.loadDatabase();

const io = WebSocket(server);
const port = process.env.PORT || 8080 ;
const staticPath = path.join( __dirname , '/public/');

app.use(express.static(staticPath));

async function userIp() {
    let api = await fetch('https://api.ipify.org?format=json');
    let jsonData = await api.json();
    database.insert({
        userIp: jsonData
    });
}
// userIp();

app.get('/' , ( req , res ) => {
    res.sendFile( path.join( staticPath , 'index.html' ));
});

// web socket connection //
io.on( 'connection' , (socket) => {
    
    database.find( userIp , (err , data) => {
        let fetchedIp = data[0].userIp.ip ;
        console.log(fetchedIp);
        
        socket.emit('fetched-ip' , fetchedIp);
    });
    
});

server.listen( port , () => {
    console.log( chalk.red.bgBlue.bold(`http://127.0.0.1:${port}`) );
});