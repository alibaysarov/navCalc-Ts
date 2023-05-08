import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";
import axios from '../../axios';
interface AirportListItem{
    name:string,
    code:string
}
interface IFplnSlice{
    airportInputValue:string,
    airportList:AirportListItem[]
}

const initialState:IFplnSlice={
    airportInputValue:'',
    airportList:[]
    
}
export const findAirportHandler=createAsyncThunk<[Object],string,{ rejectValue: string }>('fpln/findArpt', async(text:string,{rejectWithValue})=>{
try {
    const {data}=await axios.get(`/api/airports/${text}`)
    const res:AirportListItem[]= data.map(el=>el.location.properties);
    return res;
} catch (err) {
    rejectWithValue('server err')
}
})

const flighPlanSlice=createSlice({
    name:'flighPlan',
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder.addCase(findAirportHandler.fulfilled,(state,action)=>{
            
            state.airportList=action.payload
            console.log(state.airportList);
        })
    }
})
export default flighPlanSlice.reducer