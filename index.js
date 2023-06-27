require('dotenv').config()

const app = require("express")();
const path = require("path");

const cors = require("cors");

const shortid = require("shortid");
const Razorpay = require("razorpay");

const express=require("express")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
let price=0;

app.post("/",async(req,res) =>
{
const cart=req.body.cart;
price=cart.map(item => item.price*item.quantity).reduce((total,value) => total+value,0)
console.log(price);
})


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.use(cors());

// Serving company logo
app.get("/logo.png", (req, res) => {
  res.sendFile(path.join(__dirname, "logo.png"));
});



app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const amount = price;
  const currency = "INR";


  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(1337 || process.env.PORT, () => {
  console.log("Backend running at localhost:1337");
});
