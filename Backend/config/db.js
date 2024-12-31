import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

export const connectDB = async () => {
    try{
        const db = await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to", db.connection.name);
    } catch (error) {
        console.error(`Hubo un error al conectar la base de datos: ${error.message}`); 
        process.exit(1);
    }
}
