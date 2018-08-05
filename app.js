const express= require('express');
const app = express();

const morgan =require('morgan');
const bodyParser= require('body-parser');
const mongoose =require('mongoose');

mongoose.connect('mongodb://localhost:27017/Second',{useNewUrlParser:true});
const productRoute=require('./api/routes/products')
const orderRoute=require('./api/routes/order')
// app.use( (req,res,next )=>{
//     res.status(200).json( 
//         {
//             message:"Its that  Simple"
//         }
//     )

// })
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Acess-Control-Allow-Origin','*');
    res.header('Acess-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
    
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }

next();
});


//Handling Routes
app.use('/products',productRoute);
app.use('/order',orderRoute);

app.use((req,res,next) =>{
    const error = new Error('Not Found');
    error.status(404);
    next(error);
})

app.use((error,req,res,next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})

module.exports =app;