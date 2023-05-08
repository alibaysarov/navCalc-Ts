import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/ui";
import routeLineReducer from "./slices/routeLineSlice";
import flighPlanSlice from "./slices/flighPlanSlice";

const store=configureStore({
    reducer:{
        ui:uiReducer,
        routeLine:routeLineReducer,
        flightPlan:flighPlanSlice
    },
    middleware:(getDefaultMiddleWare)=>getDefaultMiddleWare({
        serializableCheck:false
    })
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;