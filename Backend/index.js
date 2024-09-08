const express = require("express")
const { connection } = require("./db")
const { ProductRouter } = require("./Routes/ProductRoutes")
const { registerroutes } = require("./Routes/userRoutes")
const {Cartrouter} =require("./Routes/CartRoutes")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors({
    origin:"*"
}))

app.use("/products",ProductRouter)
app.use("/user",registerroutes)

app.use("/cart",Cartrouter)
app.listen(3500,async(req,res)=>{
    try {
        await connection
        console.log("Server connected ");
    } catch (error) {
        
    }
    console.log("Server started successfully");
})
