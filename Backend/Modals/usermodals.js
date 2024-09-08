const mongoose = require("mongoose")

const userSchema =new mongoose.Schema({
    Profilepic:String,
    name:String,
    email:{
        type:String,
        unique:true,
        required:true
    },
    password :String,
    Mob_number:Number,
    education:String,
    Gender:String
},
{
    timestamps:true
}
)

module.exports = mongoose.model('user-details',userSchema)

                                                                                                            