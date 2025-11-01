import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
   fullName:{
    type:String,
    required:true,
   },
   email:{
    type:String,
    required:true,
    unique:true
   },
   password:{
    type:String,
    required:true
   },
   role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",        
    required: true,
   },
   profileImage:{
      type:String,
      default:"https://imgs.search.brave.com/ihd_ZApdCxo8lECB_M2IL6QZSkbruzhMaGEecUIyyCk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC82Ni82OS9k/ZWZhdWx0LXByb2Zp/bGUtcGljdHVyZS1h/dmF0YXItcGhvdG8t/cGxhY2Vob2xkZXIt/dmVjdG9yLTMyMjg2/NjY5LmpwZw"
   }
},
   {timestamps:true}
)


const User = mongoose.model("User", userSchema);

export default User;
