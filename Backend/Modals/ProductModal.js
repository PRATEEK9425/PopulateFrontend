const mongoose= require("mongoose")


const ProductSchema = mongoose.Schema({
    Imageurl:String,
    Product_name:String,
    description:String,
price:Number
})
const ProductModel = mongoose.model("Product-Data",ProductSchema)

module.exports={
    ProductModel
}

