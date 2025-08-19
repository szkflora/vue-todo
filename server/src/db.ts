import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config({ path: __dirname + '/../.env' });

export async function connectToDb () {
    await mongoose.connect(process.env.atlas_URL as string);
    console.log('Connected to MongoDB Atlas');
    return mongoose.connection.db;
}