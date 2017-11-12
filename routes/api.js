const express = require('express');
const Ninja = require('../models/ninjas');
const router = express.Router();

//get list of ninjas from db
router.get('/ninjas',function(req,res,next){
    // Ninja.find({}).then(function(ninjas){
    //     res.send(ninjas);
    // }).catch(next)

    Ninja.geoNear(
        {
            type:'Point',
            coordinates:[parseFloat(req.query.lon),parseFloat(req.query.lat)]
        },
        {
            maxDistance:100000,
            spherical:true
        }
    ).then(function(ninjas){
        res.send(ninjas);
    }).catch(next);
});

//add new ninja to db
router.post('/ninjas',function(req,res,next){
    //create method creates new object and saves it too
    Ninja.create(req.body)
    .then(function(ninja){
        res.send(ninja);
    }).catch(next);
});

//update a ninja in db
router.put('/ninjas/:id',function(req,res,next){
    Ninja.findByIdAndUpdate({_id:req.params.id},req.body).then(function(ninja){
        // old data is send using this ninja so find updated one and send
        // res.send(ninja);
        Ninja.findOne({_id:req.params.id}).then(function(ninja){
            res.send(ninja);
        }).catch(next);

    }).catch(next);
});

//delete a ninja from db
router.delete('/ninjas/:id',function(req,res,next){

    Ninja.findByIdAndRemove({_id:req.params.id}).then(function(ninja){
        res.send(ninja);
    }).catch(next);

});

module.exports=router;
