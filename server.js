const express = require('express');
const app = express();
const server = require('http').createServer(app);
const nedb = require('nedb');
const chalk = require('chalk');
const path = require('path');

const port = process.env.PORT || 8080 ;
const staticPath = path.join( __dirname , '/public/');

app.use(express.static(staticPath));

app.get('/' , ( req , res ) => {
    res.sendFile( path.join( staticPath , 'index.html' ));
});

server.listen( port , () => {
    console.log( chalk.red.bgBlue.bold(`http://127.0.0.1:${port}`) );
});