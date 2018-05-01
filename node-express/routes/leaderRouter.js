const express = require('express');
const leaderRouter = express.Router();
const bodyParser = require('body-parser');
leaderRouter.use(bodyParser.json());

leaderRouter.route('/').
all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next) => {
    //Here the req and res will be the modified ones from .all method
    res.end('Will send all the leaders to you!');
})
.post((req,res,next) => {
    
    res.end('Will add the leaders with name'+req.body.name +'and description'+req.body.description);
})
.put((req,res,next) => {
    
    res.statusCode =403;
    res.end('Cannot put request as it is not supported!');
})
.delete((req,res,next) => {
    res.end('Deleted  all leaders');
});

leaderRouter.route('/:leaderId').
all((req,res,next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next(); // next is a express middleware that ensures that it searches for another endpoint that matches the request
})
.get((req,res,next) => {
    //Here the req and res will be the modified ones from .all method
    res.end('Will send the leader '+req.params.leaderId +' to you!');
})
.post((req,res,next) => {
    
    res.statusCode =403;
    res.end('Post not supported for leader!');
})
.put((req,res,next) => {
    
    res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end('Will update the leader: ' + req.body.name + 
          ' with details: ' + req.body.description);
})
.delete((req,res,next) => {
    res.end('Deleting leader: ' + req.params.leaderId);
});

module.exports = leaderRouter
