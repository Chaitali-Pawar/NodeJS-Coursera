const express = require('express');
const dishRouter = require('./routes/dishRouter');
const promotionRouter = require('./routes/promotionRouter');
const leaderRouter = require('./routes/leaderRouter');
const http = require('http');
const morgan = require('morgan');// third part plugin for loggin
const host ='localhost';
const port ='3000';
const bodyParser = require('body-parser');

const app = express();
app.use(morgan('dev'));
app.use(express.static(__dirname +'/public'));
app.use(bodyParser.json());// ensures that the request body is parsed in a json format.

app.use('/dishes',dishRouter);
app.use('/promotions',promotionRouter);
app.use('/leaders',leaderRouter);

app.use((req,res,next)=> {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
}) 

const Server = http.createServer(app);

Server.listen(port,host,() =>{
    console.log(`Server running at http://${host}:${port}/`);
})