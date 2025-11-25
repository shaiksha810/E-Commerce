import User from '../models/authModel.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';




const userRegister = async (req,res) => {
    const {fullName, email, password, role} = req.body;

    if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({email});

    if(userExists) 
        return res.status(400).json({message:"user already exists"})


    const hashedPassword = await argon2.hash(password)    
    
    const newUser = await User.create({
       fullName,
       email,
       password:hashedPassword,
       role 
    });
   
   const token = jwt.sign(
    { id:newUser._id, username:newUser.fullName,role:newUser.role },
    process.env.JWT_SECRET,
    { expiresIn:"1d" }
)

  res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
   path: "/",
});


   res.status(201).json({
    fullName,
    email,
    role,
    message:"user register successfully"
   })
}


const userLogin = async (req,res) => {

    try {
        const { email, password } = req.body;

    if(!email || !password){
        return res.status(401).json({ message:"please enter both email and password"})
    }


    const loginUser = await User.findOne({email});

    if(!loginUser){
        return res.status(401).json({ message:"user not found"})
    }

    const isMatch = await argon2.verify(loginUser.password, password)

    if(!isMatch) return res.status(401).json({ message:"Invalid Password" })



    const token = jwt.sign(
      { id: loginUser._id, username: loginUser.fullName, role: loginUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }    
    )



  res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
   path: "/",
});



    res.status(200).json({
        fullName: loginUser.fullName,
        email: loginUser.email,
        role: loginUser.role,
        message: "Login successful",
    });
     
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  } 
}

const userProfile = async (req,res) => {

    try {
        res.status(200).json({
            profile:req.user
        })
    } catch (error) {
        console.log("profile error:", error);
        
    }
}


const userLogout = async (req,res) => {
    res.clearCookie("access_token")
    //  res.cookie("access_token", "");

    res.status(201).json({
        message:"logged Out Successfully "
    })
}






export default {
    userRegister,
    userLogin,
    userProfile,
    userLogout
}