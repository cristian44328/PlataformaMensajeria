import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost/mensajeriadb");  
        console.log(">>> DB conectada");
    } catch (error) {   
        console.log(error);
    }
};

