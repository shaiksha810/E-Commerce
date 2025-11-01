import mongoose from "mongoose";

const dbconnection = async () =>{

    await mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        console.log("atlas is connected");
    })
    .catch((err) => {
        console.log(err);
    })
} 

export default dbconnection;    