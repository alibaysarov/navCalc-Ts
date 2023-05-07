import { createSlice, PayloadAction, CaseReducer } from '@reduxjs/toolkit';


interface IUiState{
    anchorEl:null|HTMLElement
}
const initialState:IUiState={
    anchorEl:null
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
        }
    }
})

export const {openFligtPlan,closeFligtPlan}=uiSlice.actions
export default uiSlice.reducer