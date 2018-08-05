const express = require('express');
const router =express.Router();
const Order =require('../models/order')
const mongoose =require('mongoose');

router.get('/',(req,res,next) =>{

 res.status(200).json({
     message:'Orders Were Fetched'
 })

})


router.post('/',(req,res,next) =>{

    // const order ={
    //     productid:req.body.productid,
    //     quantity:req.body.quantity
    // }

    const order =new Order({
        _id : new mongoose.Types.ObjectId(),
        productid:req.body.productid,
        quantity:req.body.quantity
    })
    order
        .save()
        .then( result => {
             console.log(result);
        })
        .catch(err => { console.log(err) })

    res.status(201).json({
        message:'Orders Was Created',
        createdOrder:order
    })
   
   })

   router.get('/:orderId',(req,res,next) =>{
  


    res.status(200).json({
        message:'Orders Were Fetched',
        id:req.params.orderId
    })

    Order.findById(id)
    .exec()
    .then( doc => {
      console.log(doc)
      res.status(200).json(doc)    
    })
    .catch( err => { console.log(err)
      res.status(500).json({error:err})
     })





   
   })

   router.delete('/:orderId',(req,res,next) =>{

    res.status(200).json({
        message:'Oreders Deleted',
        id:req.params.orderId
    })
   
   })




module.exports =router;