import { Request,Response } from 'express';
import Airport from '../Models/Airport';

export const findByNameOrCode=async(req:Request,res:Response)=>{
try {
    const stringName=req.params.name;
    const isItcode:RegExp=/[A-Za-z]{1,4}/g;
    let airport;
    if (isItcode.test(stringName)) {
        airport =await Airport.find({"location.properties.code":new RegExp(stringName,'i') })
    } else {
        airport =await Airport.find({"location.properties.name":new RegExp(stringName,'i') })
    }
    
    if (airport) {
        res.status(200).json(airport)
    } else {
        res.status(404).json({err:'Ничего не найдено'})
    }
} catch (err) {
    res.status(500).json(err)
}
}
export const getAll=async(req:Request,res:Response)=>{
    try {
        const airports=await Airport.find().limit(10).exec();
        if(airports.length>0){
            return res.status(200).json(airports)
        }else{
            return res.status(404).json({
                message:'Аэродромы не найдены'
            })
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}