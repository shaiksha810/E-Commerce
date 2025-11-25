import mongoose from "mongoose";

const dbconnection = async () =>{

    await mongoose.connect( "mongodb+srv://shaiksha:shaiksha810@cluster0.bmrxwhj.mongodb.net/e-coomerce?appName=Cluster0")
    .then(() =>{
        console.log("atlas is connected");
    })
    .catch((err) => {
        console.log(err);
    })
} 

export default dbconnection;    