import express,{Express,Request,Response} from 'express';

import dotenv from 'dotenv';
dotenv.config()
import airportRouter from './routes/airports';
import mongoose from 'mongoose';
const app:Express=express()
app.use(express.json())
mongoose.connect(`${process.env.MONGO_URL}`)
.then(()=>{
    console.log('DB is OK')
})
.catch((err) => console.log("DB Error", err));
app.use('/api/airports',airportRouter);


app.get('/',(req:Request,res:Response)=>{
    res.send("Hello world")
})


const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})