import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Coordinate } from "ol/coordinate";

interface IrouteState{
    points:Coordinate[],
    lineCount:number
}

const routeLineState:IrouteState={
    points:[],
    lineCount:0

}
const routeLineSlice=createSlice({
    name:'routeLine',
    initialState:routeLineState,
    reducers:{
        addPoint:(state,action:PayloadAction<number[]>)=>{
            state.points.push(action.payload)
            return state
        },
        drawEndHandler:(state)=>{
            state.lineCount=1;
        }
    }
})
export const{addPoint,drawEndHandler}=routeLineSlice.actions
export default routeLineSlice.reducer