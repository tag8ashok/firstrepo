const express = require('express');
const router =express.Router();
const Product = require('../models/products');
const mongoose =require('mongoose');

router.get('/',( req,res,next)=>{
 
    // res.status(200).json({
    //     message:'Handling GET Request'
    // })
    Product.find()
           .exec()
           .then( docs => {
              console.log(docs) 
              res.status(200).json(docs);
           } ) 
           .catch( err => {
                console.log(err);
                res.status(500).json({
                    error:err
                })
           } )

});




//Handling Post
router.post('/',( req,res,next)=>{
    // const product ={
    //     name: req.body.name,
    //     price: req.body.price
    // }
    
    const product =new Product({
        _id :  new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
    
    })

    product.
            save()
            .then( result => {
                 console.log(result);
            })
            .catch(err => { console.log(err)});
    
    


    res.status(200).json({
        message:'Handling post Request',
        createdProduct: product
    })

});



//For Getting Based on IDs
router.get('/:productId',( req,res,next)=>{
 
    const id=req.params.productId;
   
    // if( id === 'special'){
    //     res.status(200).json({
    //         message:'You Discovered a specail ID',
    //         id :id
    //     })
    // }
    // else{
    //     res.status(200).json({
    //         message:'You Discovered an ID',
           
    //     })

    // }


    Product.findById(id)
           .exec()
           .then( doc => {
             console.log(doc)
             if(doc){
                  res.status(200).json(doc);
             }else{
                 res.status(404).json({ message:"No Valid Entry Found" })
             }
 

             res.status(200).json(doc)    
           })
           .catch( err => { console.log(err)
             res.status(500).json({error:err})
            })




});

//Patch  For Update IDs
router.patch('/:productId',( req,res,next)=>{
    const id =req.params.productId;
    const updateOps ={}
    for (const ops of req.body){
        updateOps[ops.propName] =ops.value;
    }
Product.update({_id:id},{$set:updateOps})
       .exec()
       .then( result =>{
            console.log(result);
            res.status(200).json(result);
       })
       .catch( err=>{
           console.log(err);
           res.
              status(500)
              json({
                  error:err
              })
       })


    // res.status(200).json({
    //     message:'Updated Product'
    // })

    
});

//Patch  For Delete IDs
router.delete('/:productId',( req,res,next)=>{
    const id =req.params.productId;
    Product.remove({_id:id})
           .exec()
           .then( result =>{
            res.status(200).json(result)
           } )
           .catch( err => {
                console.log(err);
                res.status(500).json({
                     error:err
                })
           } )
    // res.status(200).json({
    //     message:'Deleted Product'
    // })

    
});




module.exports =router;