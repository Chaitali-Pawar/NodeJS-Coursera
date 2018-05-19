const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose); // to use currency type as a data type
var Currency = mongoose.Types.Currency;

var promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default:false      
    }
}, {
    timestamps: true
});
  // creates a model of Dish   
var Promotions = mongoose.model('Promotion',promotionSchema);

module.exports = Promotions;

