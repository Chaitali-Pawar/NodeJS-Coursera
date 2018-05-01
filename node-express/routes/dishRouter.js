const express = require('express');
const dishRouter = express.Router();
const bodyParser = require('body-parser');

dishRouter.use(bodyParser.json());
// route all the api calls here
// We use express router because if there were 1000 api endpoints to be define using app then there would a chance of 
// erroroneous end points also length of index.js would go on increasing , thus segragate them into mini express apps
//later mount them in index.js also export this module
dishRouter.route('/').
all((req,res,next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next(); // next is a express middleware that ensures that it searches for another endpoint that matches the request
})
.get((req,res,next) => {
    //Here the req and res will be the modified ones from .all method
    res.end('Will send all the dishes to you!');
})
.post((req,res,next) => {
    
    res.end('Will add the dishes with name'+req.body.name +'and description'+req.body.description);
})
.put((req,res,next) => {
    
    res.statusCode =403;
    res.end('Cannot put request as it is not supported!');
})
.delete((req,res,next) => {
    res.end('Deleted  all dishes');
});

dishRouter.route('/:dishId').
all((req,res,next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next(); // next is a express middleware that ensures that it searches for another endpoint that matches the request
})
.get((req,res,next) => {
    //Here the req and res will be the modified ones from .all method
    res.end('Will send the dish'+req.params.dishId +' to you!');
})
.post((req,res,next) => {
    
    res.statusCode =403;
    res.end('Post not supported for dish!');
})
.put((req,res,next) => {
    
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + 
          ' with details: ' + req.body.description);
})
.delete((req,res,next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});

module.exports = dishRouter


