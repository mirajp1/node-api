var mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create schema for geolocation database
const GeoSchema=new Schema({
    type:{
        type:String,
        default:'Point'
    },
    coordinates:{
        type:[Number],
        index:'2dsphere'
    }
});

//create schema for ninja
const NinjaSchema=new Schema({
    name:{
        type:String,
        required: [true,'Name field is required']
    },
    rank:{
        type:String,
    },
    available:{
        type:Boolean,
        default:false
    },
    geometry:GeoSchema

});

//ninja model which represents an object/data in collection of ninjas
const Ninja = mongoose.model('ninja',NinjaSchema);

module.exports = Ninja;
