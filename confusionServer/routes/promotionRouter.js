const express = require('express');
const promotionRouter = express.Router();
const bodyParser = require('body-parser');
const Promotions = require('../models/promotions');
promotionRouter.use(bodyParser.json());
var authenticate = require('../authenticate');

promotionRouter.route('/')
.get((req,res,next) => {
    //Here the req and res will be the modified ones from .all method
    Promotions.find({})
    .then((promotions)=> {
        res.statusCode =200;
        res.setHeader('Content-type','application/json');
        res.json(promotions);
 
    },err => next(err))
    .catch(err => next (err));
})
.post(authenticate.verifyUser,(req,res,next) => {
    
    Promotions.create(req.body)
   .then ((promotions) => {
    console.log (" created promotions is"+promotions)
    res.statusCode =200;
    res.setHeader('Content-type','application/json');
    res.json(promotions);
   } , (err) => next(err) )
   .catch(err => next(err));
})
.put(authenticate.verifyUser,(req,res,next) => {
    
    res.statusCode =403;
    res.end('Cannot put request as it is not supported!');
})
.delete(authenticate.verifyUser,(req,res,next) => {
    Promotions.remove()
    .then ((resp) => {
     res.statusCode =200;
     res.setHeader('Content-type','application/json');
     res.json(resp);
    } , err => next(err))
    .catch (err => next(err));
});

promotionRouter.route('/:promotionId')/*.
all((req,res,next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next(); // next is a express middleware that ensures that it searches for another endpoint that matches the request
})*/
.get((req,res,next) => {
    //Here the req and res will be the modified ones from .all method
   // res.end('Will send the promotion'+req.params.promotionId +' to you!');
   Promotions.findById(req.params.promotionId)
   .then((promotion) => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(promotion);
   }, (err) => next(err))
   .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req,res,next) => {
    
    res.statusCode =403;
    res.end('Post not supported for promotion!');
})
.put(authenticate.verifyUser,(req,res,next) => {
    
    Promotions.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body
    }, { new: true })
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser,(req,res,next) => {
    Promotions.findByIdAndRemove(req.params.promotionId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = promotionRouter
