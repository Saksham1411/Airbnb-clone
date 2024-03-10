require('dotenv').config();
require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const imageRoute = require('./routes/uploadImages');
const placeRoute = require('./routes/places');
const reviewRoute = require('./routes/reviews');
const bookingRoute = require('./routes/booking');
const paymentRoute = require('./routes/stripeCheckout');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cookieParser());
app.use(express.json());
app.use('/uploads',express.static('./uploads'));
app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND
}))

app.use('/',userRoutes);
app.use('/',imageRoute);
app.use('/',placeRoute);
app.use('/',bookingRoute);
app.use('/',paymentRoute);
app.use('/',reviewRoute);

mongoose.connect(process.env.MONGO_URI).then(()=>console.log('connected'));

app.listen(PORT,()=> console.log('working...'));


