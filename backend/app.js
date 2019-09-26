// MONGO DB PW: tczJd3dArrDW3XGM
//MONGODB CONNECT mongodb+srv://jeff007:<password>@cluster0-shtxy.mongodb.net/test?retryWrites=true&w=majority
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Thing = require('./models/thing');
const app = express();


mongoose.connect('mongodb+srv://jeff007:tczJd3dArrDW3XGM@cluster0-shtxy.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.json());
app.post('/api/stuff', (req, res, next) => {
    const thing = new Thing({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId
    });
    thing.save().then(
      () => {
        res.status(201).json({
          message: 'Post saved successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });
app.use('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id: 'fddfdgv',
            title: 'My first thing',
            description: 'All of the info about my thing',
            imageUrl: 'https://cdn.pixabay.com/photo/2017/03/27/14/48/tea-2179175_960_720.jpg',
            price: 4900,
            userId: 'dfdsfgfdsg'
        },
        {
            _id: 'fddfdgv',
            title: 'My second thing',
            description: 'All of the info about my thing',
            imageUrl: 'https://image.shutterstock.com/image-photo/cup-tea-mint-on-wooden-260nw-139065488.jpg',
            price: 3700,
            userId: 'dfdsfgfdsg'
        },
    ];
    res.status(200).json(stuff);
});
module.exports = app;