const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const studentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        unique : true
    },
    confirmpassword : {
        type : String,
        required : true
    }
})

studentSchema.pre("save",async function(next){
    this.password = await bcrypt.hash(this.password,10);
    this.confirmpassword = await bcrypt.hash(this.confirmpassword,10);
    next();
})
const RegisterStudents = new mongoose.model("RegisterStudents",studentSchema);
module.exports = RegisterStudents;