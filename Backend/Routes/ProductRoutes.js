const express = require("express")
const { ProductModel } = require("../Modals/ProductModal")

const ProductRouter = express.Router()

ProductRouter.get("/",async(req,res)=>{
    try{
const data = await  ProductModel.find()
res.send(data)
    }catch(err){
console.log(err)
res.send({"msg":"Err while gettting data"})
    }
})

ProductRouter.get("/single/:id",async(req,res)=>{
    const id = req.params.id
    try{
  const data = await   ProductModel.findOne({"_id":id})
  res.send(data)
    }catch(err){
  console.log(err)
  res.send({"msg":"Err while gettting data"})
    }
  })
// --- price low to high
ProductRouter.get('/price/low-to-high', async (req, res) => {
  try {
    const results = await ProductModel.find().sort({ price: 1 }) // Sorting by 'price' field in ascending order
    res.json(results);
  } catch (error) {
    console.error('Error fetching sorted data', error);
    res.status(500).send('Internal Server Error');
  }
});

// ----

// --- price high to low
ProductRouter.get('/price/high-to-low', async (req, res) => {
  try {
    const results = await ProductModel.find().sort({ price: -1 }) // Sorting by 'price' field in ascending order
    res.json(results);
  } catch (error) {
    console.error('Error fetching sorted data', error);
    res.status(500).send('Internal Server Error');
  }
});

// ----
  
ProductRouter.get("/searchbyname/:name",async(req,res)=>{
  const Name = req.params.name
  try{
const data = await   ProductModel.find({Product_name:Name})
res.send(data)
  }catch(err){
console.log(err)
res.send({"msg":"Err while gettting data"})
  }
})


ProductRouter.post("/create",async(req,res)=>{
    const payload = req.body
    try {
        const data = new ProductModel(payload)
        await data.save()
        res.status(201).json({msg:"Product Added Successfully"})
    } catch (error) {
        console.log(error);
    }
})

ProductRouter.patch("/update/:id",async(req,res)=>{
    const ID = req.params.id
    const payload = req.body
    try{
  await  ProductModel.findByIdAndUpdate({_id:ID},payload)
  res.send("data Updated successfully")
    }catch(err){
  console.log(err)
    }
  
  })
  
  ProductRouter.delete("/remove/:id",async(req,res)=>{
    const ID = req.params.id
    try{
  await  ProductModel.findByIdAndDelete({_id:ID})
  res.send(`DeLeted the data `)
    }catch(err){
  console.log(err)
    }
  })




module.exports={ProductRouter}