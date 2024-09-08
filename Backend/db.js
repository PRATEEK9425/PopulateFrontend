const mongoose= require("mongoose")

const connection = mongoose.connect("mongodb+srv://nmpratik9425:ecomm@cluster0.x7nc3ea.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

module.exports={
    connection
}
