import { createSlice, PayloadAction, CaseReducer } from '@reduxjs/toolkit';


interface IUiState{
    anchorEl:null|HTMLElement
    anchorElFilter:null|HTMLElement
}
const initialState:IUiState={
    anchorEl:null,
    anchorElFilter:null
}
const uiSlice=createSlice({
    name:'ui',
    initialState,
    reducers:{
        openFligtPlan:(state,action:PayloadAction<HTMLElement>)=>{
            state.anchorEl=action.payload
            return state
        },
        closeFligtPlan:(state)=>{
            state.anchorEl=null
            return state
        },
        openFilter:(state,action:PayloadAction<HTMLElement>)=>{
            state.anchorElFilter=action.payload
            return state
        },
        closeFilter:(state)=>{
            state.anchorElFilter=null
            return state
        },
    }
})

export const {openFligtPlan,closeFligtPlan,openFilter,closeFilter,}=uiSlice.actions
export default uiSlice.reducer