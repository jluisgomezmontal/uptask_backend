import mongoose from "mongoose";

export const conectarDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const URL = `${connection.connection.host}:${connection.connection.port}`
        console.log(`MongoDB Conectado en ${URL}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}