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




  app.post('/create-checkout-session', async (req, res) => {
    let cart=req.body.CART;
    console.log(cart);

     
    const line_items = [];
    

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
  success_url: 'http://localhost:3000/',
  cancel_url: 'http://localhost:3000/',
});
console.log(session)
var redir = { redirect: session.url };
        return res.json(redir);
  });


app.listen(process.env.port || 4242, () => console.log(`Listening on port !`));