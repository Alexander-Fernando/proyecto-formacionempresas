const {Router} = require('express');
const getOrderAmount = require('../helpers/getOrderAmount');
const router = Router();

const stripe = require('stripe')(process.env.STRIPE_KEY)


//CREAR INTENTO PAGO
router.post("/", async (req, res) => {
    const items  = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: await getOrderAmount(items),
      currency: "pen"
    });
    res.send({
      clientSecret: paymentIntent.client_secret
    });
  });


module.exports = router;