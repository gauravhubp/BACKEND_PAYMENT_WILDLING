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
let cart;
app.post("/price",async(req,res) =>
{
  cart=req.body.cart;
console.log(cart);


})



app.post('/create-checkout-session', async (req, res) => {
  const line_items = [];
  const cart = [{
    title: 'prod_IHb8dX3ESy2kwk',
    quantity: '2',
    price : '900'
}, {
    title: 'prod_IFIIyTO0fHCfGx',
    quantity: '2',
    price: '633'
}
];


      for (let item of cart) {
          
          line_items.push({
              price_data: {
                  currency: 'inr',
                  product_data: {
                      name: item.title,
                  },
                  unit_amount: item.price*100,
              },
              quantity: item.quantity,
          });
      }
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: 'http://localhost:4242/success',
    cancel_url: 'http://localhost:4242/cancel',
  });

  res.redirect(303, session.url);
});

app.listen(process.env.port || 4242, () => console.log(`Listening on port !`));