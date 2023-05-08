import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Coordinate } from "ol/coordinate";

interface IrouteState{
    points:Coordinate[]
}

const routeLineState:IrouteState={
    points:[]
}
const routeLineSlice=createSlice({
    name:'routeLine',
    initialState:routeLineState,
    reducers:{
        addPoint:(state,action:PayloadAction<number[]>)=>{
            state.points.push(action.payload)
            return state
        }
    }
})
export const{addPoint}=routeLineSlice.actions
export default routeLineSlice.reducer