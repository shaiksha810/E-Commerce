import jwt from "jsonwebtoken";
import User from "../models/authModel.js"

const protect = async (req,res,next) => {
    try {
        const token = req.cookies.access_token;

        if(!token) return res.status(401).json({ message:"Please Login" })

        const decoded = jwt.verify(token, process.env.JWT_SECRET)    
        req.user = await User.findById(decoded.id).select("-password")
        
        next()

    } catch (error) {
       res.status(401).json({ message: "Token invalid or expired" }); 
    }
}


const authorize = (...roles) => {
    return (req, res, next) => {

        if(!roles.includes(req.user.role)){
            return res.status(403).json({ message:`Role ${req.user.role} not allowed` })
        }

        next();
    }
}


export default {
    protect,
    authorize
}