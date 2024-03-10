const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const stripe = require("stripe")(process.env.STRIPE_SECRET);

router.post('/stripe-checkout',async(req,res)=>{
    const {title,image,price} = req.body;
    const lineItems = {
        price_data:{
            currency:"inr",
            product_data:{
                name:title,
                images:[image]
            },
            unit_amount:price*100,
        },
        quantity:1
    };
    console.log(lineItems);
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:[lineItems],
        mode:'payment',
        success_url:`${process.env.FRONTEND}/account/bookings`,
        cancel_url:`${process.env.FRONTEND}/cancel`,
    })

    res.status(StatusCodes.OK).send({id:session.id});
})


module.exports = router;