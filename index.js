// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.
const express=require("express")
const app = express();
const stripe = require('stripe')('sk_test_51NHPWGSAcfclqU9cSd5svYvzbHgh95kpn09wqMuPngVzy6iFkXIJyTFwPDfefLFIK3iZczrejWdrcOySaw36BdL500enej6SUd')

const cors = require("cors");
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
let price=0;
let line_items;
app.post("/price",async(req,res) =>
{
const cart=req.body.cart;
price=cart.map(item => item.price*item.quantity).reduce((total,value) => total+value,0)
console.log(price);

line_items =cart.map((item) => {
  return {
  price_data: {
  currency: "inr",
  product_data: {
  name: item.title,
  description: item.content,
  metadata: {
  id: item.id,
  },
  },
  unit_amount: item.price * 100,
  },
  quantity: item.quantity,
  };
  });


})



app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: 'http://localhost:4242/success',
    cancel_url: 'http://localhost:4242/cancel',
  });

  res.redirect(303, session.url);
});

app.listen(process.env.port || 4242, () => console.log(`Listening on port !`));