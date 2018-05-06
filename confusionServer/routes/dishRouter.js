const express = require('express');
const dishRouter = express.Router();
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const Dishes = require ('../models/dishes');


dishRouter.use(bodyParser.json());
// route all the api calls here
// We use express router because if there were 1000 api endpoints to be define using app then there would a chance of 
// erroroneous end points also length of index.js would go on increasing , thus segragate them into mini express apps
//later mount them in index.js also export this module
dishRouter.route('/')
/*.all((req,res,next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next(); // next is a express middleware that ensures that it searches for another endpoint that matches the request
})*/
.get((req,res,next) => {
    //Here the req and res will be the modified ones from .all method
   // res.end('Will send all the dishes to you!');
   Dishes.find({})
   .then((dishes)=> {
       res.statusCode =200;
       res.setHeader('Content-type','application/json');
       res.json(dishes);

   },err => next(err))
   .catch(err => next (err));

})
.post((req,res,next) => {
    
   // res.end('Will add the dishes with name'+req.body.name +'and description'+req.body.description);
   Dishes.create(req.body)
   .then ((dish) => {
    console.log (" created dish is"+dish)
    res.statusCode =200;
    res.setHeader('Content-type','application/json');
    res.json(dish);
   } , (err) => next(err) )
   .catch(err => next(err));
})
.put((req,res,next) => {
    
    res.statusCode =403;
    res.end('Cannot put request as it is not supported!');
})
.delete((req,res,next) => {
   // res.end('Deleted  all dishes');
   Dishes.remove()
   .then ((resp) => {
    res.statusCode =200;
    res.setHeader('Content-type','application/json');
    res.json(resp);
   } , err => next(err))
   .catch (err => next(err));
});

dishRouter.route('/:dishId')/*.
all((req,res,next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next(); // next is a express middleware that ensures that it searches for another endpoint that matches the request
})*/
.get((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    
    res.statusCode =403;
    res.end('Post not supported for dish!');
})
.put((req,res,next) => {
    
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, { new: true })
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req,res,next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

// route to update comments in a dish 
dishRouter.route('/:dishId/comments')
.get((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        // Initiallly check if the dish is not null
        if(dish !=null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments);
        }
        else {
            // dish is not found
            err = new Error('Dish not found'+req.params.dishId);
            res.statusCode = 400;
            return next(err);
        }
       
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        // Initiallly check if the dish is not null
        if(dish !=null){
            dish.comments.push(req.body);
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                 res.setHeader('Content-Type', 'application/json');
                 res.json(dish);
            }, (err) => next(err) )
            
        }
        else {
            // dish is not found
            err = new Error('Dish not found'+req.params.dishId);
            res.statusCode = 400;
            return next(err);
        }
       
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res,next) => {
    
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes/'
        + req.params.dishId + '/comments');
})
.delete((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {

        if(dish !=null){
            for (var i = (dish.comments.length -1); i >= 0; i--) {
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);                
            }, (err) => next(err));
        }
        else {
            // dish is not found
            err = new Error('Dish not found'+req.params.dishId);
            res.statusCode = 400;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

 // when url involves comment id:-

 dishRouter.route('/:dishId/comments/:commentId')
.get((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments.id(req.params.commentId));
        }
        else if (dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId
        + '/comments/' + req.params.commentId);
})
.put((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            if (req.body.rating) {
                dish.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment) {
                dish.comments.id(req.params.commentId).comment = req.body.comment;                
            }
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);                
            }, (err) => next(err));
        }
        else if (dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            dish.comments.id(req.params.commentId).remove();
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);                
            }, (err) => next(err));
        }
        else if (dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = dishRouter


