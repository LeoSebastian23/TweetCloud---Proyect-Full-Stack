import dotenv from "dotenv";
dotenv.config();

export const config = {
    jwt:{
        api_key: process.env.JWT_KEY,
        api_secrect:process.env.JWT_SECRET
    }  
}
