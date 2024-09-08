const express = require("express");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Modals/usermodals")

const registerroutes = express.Router();


registerroutes.post("/register", async (req, res) => {
    const { name, email, password, Mob_number,Profilepic, education ,Gender} = req.body;
    try {
      const Userpresent = await User.find({ email });
  
      if (Userpresent.length > 0) {
       throw new Error ("User Already Exist")
      } 
      if(!email){
        throw new Error("Please provide email")
     }
     if(!password){
         throw new Error("Please provide password")
     }
     if(!name){
         throw new Error("Please provide name")
     }
     if(!Mob_number){
        throw new Error("Please provide Mobile Number")
     }
     if(!Profilepic){
        throw new Error("Please provide  Profile Picture")
     }
     if(!education){
        throw new Error("Please provide Education")
     }
      else {
        const saltRounds = 10
        bcrypt.hash(password, saltRounds, function (err, Secure_password) {
          if (err) {
            console.log(err);
          } else {
            const user = new User({
                name, email, Mob_number,Profilepic, education,
              password: Secure_password,Gender
              
            });
            user.save();
            res.status(201).json({
                data : user,
                success : true,
                error : false,
                message : "User created Successfully!"
            })
          }
        });
      }
    } catch (err) {
        res.json({
            message :"Something Went Wrong" ,
            error : true,
            success : false,
        })
    }
  });



  registerroutes.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if(!email){
        throw new Error("Please provide email")
     }
     if(!password){
         throw new Error("Please provide password")
     }
    try {
      const user = await User.find({ email });
    
      const Hashed_password = user[0].password;
      if (user.length > 0) {
        bcrypt.compare(password, Hashed_password, (err, result) => {
          if (result) {
            const token = jwt.sign({ Ecomm:"dshjgfsdhj"}, "qwerty");

           


            res.status(201).json({
                token: token,
                success : true,
                error : false,
                message :"Login Successful",
userId:user[0]._id 

            })


          } else {
            res.json({
                message :"Wrong Credentials" ,
                error : true,
                success : false,
            })
          }
        });
      } else {
       
        res.json({
            message :"Wrong Credentials" ,
            error : true,
            success : false,
        })
      }
    } catch (err) {
        res.json({
            message :"Something Went Wrong" ,
            error : true,
            success : false,
        })
    }
  });



  registerroutes.get("/profile/:id",async(req,res)=>{
    const id = req.params.id
    try{
  const carausel = await  User.findOne({"_id":id})
  res.send(carausel)
    }catch(err){
  console.log(err)
  res.send({"msg":"Err while gettting data"})
    }
  })



  module.exports={registerroutes}