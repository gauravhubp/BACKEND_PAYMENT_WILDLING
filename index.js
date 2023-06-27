// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51NHPWGSAcfclqU9cSd5svYvzbHgh95kpn09wqMuPngVzy6iFkXIJyTFwPDfefLFIK3iZczrejWdrcOySaw36BdL500enej6SUd')
const express=require("express")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
let price=0;


app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:4242/success',
    cancel_url: 'http://localhost:4242/cancel',
  });

  res.redirect(303, session.url);
});

app.listen(process.env.port || 4242, () => console.log(`Listening on port !`));