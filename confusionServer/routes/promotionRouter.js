const express = require('express');
const promotionRouter = express.Router();
const bodyParser = require('body-parser');
promotionRouter.use(bodyParser.json());

promotionRouter.route('/').
all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next) => {
    //Here the req and res will be the modified ones from .all method
    res.end('Will send all the promotions to you!');
})
.post((req,res,next) => {
    
    res.end('Will add the promotions with name'+req.body.name +'and description'+req.body.description);
})
.put((req,res,next) => {
    
    res.statusCode =403;
    res.end('Cannot put request as it is not supported!');
})
.delete((req,res,next) => {
    res.end('Deleted  all promotions');
});

promotionRouter.route('/:promotionId').
all((req,res,next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next(); // next is a express middleware that ensures that it searches for another endpoint that matches the request
})
.get((req,res,next) => {
    //Here the req and res will be the modified ones from .all method
    res.end('Will send the promotion'+req.params.promotionId +' to you!');
})
.post((req,res,next) => {
    
    res.statusCode =403;
    res.end('Post not supported for promotion!');
})
.put((req,res,next) => {
    
    res.write('Updating the promotion: ' + req.params.promotionId + '\n');
    res.end('Will update the promotion: ' + req.body.name + 
          ' with details: ' + req.body.description);
})
.delete((req,res,next) => {
    res.end('Deleting promotion: ' + req.params.promotionId);
});

module.exports = promotionRouter
