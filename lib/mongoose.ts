import mongoose from 'mongoose';

let isConnected:boolean = false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery',true);

    if(!process.env.MONGODB_URL){
        console.log('MONGODB_URL not found');
        return;
    }

    if(isConnected){
        console.log('Already connected to database');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL,{
            dbName:"devflow"
        });
        isConnected = true;
        console.log('Connected to database');
    } catch (error) {
        console.log('Error connecting to database');
    }

}