const express = require('express');

const CartItem = require('../Modals/Cartmodal');
const User = require('../Modals/usermodals');
const Cartrouter = express.Router();

// Add to cart
Cartrouter.post('/addtocart/:userloginId/:addedproductId', async (req, res) => {
    const loginuseId = req.params.userloginId
const BagAddedProuctId = req.params.addedproductId

    try {
      const {  quantity } = req.body;
      const cartItem = new CartItem({ userId: loginuseId, productId:BagAddedProuctId, quantity });
      await cartItem.save();
      res.status(201).send('Item added to cart');
    } catch (error) {
      res.status(400).send(error.message);
      console.log(error);
    }

  });


  Cartrouter.get('/checkcart/:userIdcheck',  async (req, res) => {
    const userIdvalue = req.params.userIdcheck
    try {
      const cartItems = await CartItem.find({ userId: userIdvalue }).populate('productId');
      res.json(cartItems);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

Cartrouter.delete("/remove/:id",async(req,res)=>{
  const ID= req.params.id 
  try {
    await CartItem.findByIdAndDelete({ _id: ID });
    res.status(200).send("Product Removed From Cart")
  } catch (error) {
    res.status(500).send('Not Able To remove Product');
  }
})

Cartrouter.patch("/update/:id",async(req,res)=>{
  const ID = req.params.id
  const payload = req.body
  try{
await CartItem.findByIdAndUpdate({_id:ID},payload)
res.status(200).send("Quantity Updated Successfully")
  }catch(err){
console.log(err)
res.status(500).send('Not Able To Update Quantity');
  }

})

  module.exports ={Cartrouter}