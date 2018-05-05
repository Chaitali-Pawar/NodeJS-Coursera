const mongoose = require('mongoose');
mongoose.Promise = require('bluebird'); // blue bird is a third party libary that makes 
//mongoose promise aware api

const Dishes = require('./models/dishes');
const url = 'mongodb://localhost:27017/confusion';

const connect = mongoose.connect(url ,{
    useMongoClient : true
});

connect.then( (db) => {
    console.log ("connected to db");

    Dishes.create({
        name: 'Uthappizza10',
        description: 'test'
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: 'Updated test'}
        },{ 
            new: true 
        })
        .exec();
    })
    .then((dish) => {
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'
        });

        return dish.save();
    })
    .then((dish) => {
        console.log(dish);

        return db.collection('dishes').drop();
    })
    .then(() => {
        return db.close();
    })
    .catch((err) => {
        console.log(err);
    });

    
});