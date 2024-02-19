require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const imageRoute = require('./routes/uploadImages');
const placeRoute = require('./routes/places');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cookieParser());
app.use(express.json());
app.use('/uploads',express.static('./uploads'));
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))

app.use('/',userRoutes);
app.use('/',imageRoute);
app.use('/',placeRoute);


mongoose.connect('mongodb://127.0.0.1:27017/airBnB').then(()=>console.log('connected'));

app.listen(PORT,()=> console.log('working...'));


