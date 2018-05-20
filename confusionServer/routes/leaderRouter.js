const express = require('express');
const leaderRouter = express.Router();
const bodyParser = require('body-parser');
const Leaders = require('../models/leaders');
leaderRouter.use(bodyParser.json());
var authenticate = require('../authenticate');

leaderRouter.route('/')
.get((req,res,next) => {
    //Here the req and res will be the modified ones from .all method
    Leaders.find({})
    .then((leaders)=> {
        res.statusCode =200;
        res.setHeader('Content-type','application/json');
        res.json(leaders);
 
    },err => next(err))
    .catch(err => next (err));
})
.post(authenticate.verifyUser,(req,res,next) => {
    Leaders.create(req.body)
    .then ((leaders) => {
     console.log (" created promotions is"+leaders)
     res.statusCode =200;
     res.setHeader('Content-type','application/json');
     res.json(leaders);
    } , (err) => next(err) )
    .catch(err => next(err));
   // res.end('Will add the leaders with name'+req.body.name +'and description'+req.body.description);
})
.put(authenticate.verifyUser,(req,res,next) => {
    
    res.statusCode =403;
    res.end('Cannot put request as it is not supported!');
})
.delete(authenticate.verifyUser,(req,res,next) => {
    Leaders.remove()
    .then ((resp) => {
     res.statusCode =200;
     res.setHeader('Content-type','application/json');
     res.json(resp);
    } , err => next(err))
    .catch (err => next(err));
});

leaderRouter.route('/:leaderId')
.get((req,res,next) => {
    //Here the req and res will be the modified ones from .all method
   // res.end('Will send the leader '+req.params.leaderId +' to you!');
   Leaders.findById(req.params.leaderId)
   .then((leader) => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(leader);
   }, (err) => next(err))
   .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req,res,next) => {
    res.statusCode =403;
    res.end('Post not supported for leader!');
   
})
.put(authenticate.verifyUser,(req,res,next) => {
    
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true })
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser,(req,res,next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = leaderRouter
