import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";
import axios from '../../axios';
import { Coordinate } from "ol/coordinate";
import { calcDistance, getLegDistance, IWayPoint, Leg, Route } from "../../utils/airNavigation";


interface AirPortProperties{
    name: string,
    code: string
}
interface AirPortGeometry{
    coordinates: number[],
    type: string
}
interface AirportLoc{
    properties:AirPortProperties
    geometry: AirPortGeometry
}
interface AirportListItem extends Object{
    location: AirportLoc,
    _id: string
}

interface IFplnSlice{
    departureAirportInputValue:string,
    arrivalAirportInputValue:string,
    airportList:AirportListItem[] |[],
    departureAirport:AirportListItem |null,
    arrivalAirport:AirportListItem |null,
    points:Coordinate[]|[[],[]], 
    waypoints:IWayPoint[]|[],
    totalDistance:number,
}

const initialState:IFplnSlice={
    departureAirportInputValue:'',
    arrivalAirportInputValue:'',
    airportList:[],
    departureAirport:null,
    arrivalAirport:null,
    totalDistance:0,
    points:[[],[]],
    waypoints:[]
    
}



export const findAirportHandler=createAsyncThunk<AirportListItem[],string,{ rejectValue: string }>('fpln/findArpt', async(text:string,{rejectWithValue})=>{
try {
    if(text==''){
        const {data,status}=await axios.get(`/api/airports/all`)
        if(status>=200 && status<=399){
            return data as AirportListItem[];
        }else{
            return []
        }
    }else{
        const {data,status}=await axios.get(`/api/airports/${text}`)
        if(status>=200 && status<=399){

            return data as AirportListItem[];
        }else{
            return [];
        }
    }
} catch (err) {
    rejectWithValue('server err')
}
})

const flighPlanSlice=createSlice({
    name:'flighPlan',
    initialState,
    reducers:{
        setDepartureCoorinates:(state,action:PayloadAction<string>)=>{
            state.departureAirport=state.airportList.filter(airport=>airport.location.properties.name==action.payload)[0];
            console.log(state.arrivalAirport==null);
            if(state.departureAirport==null || state.arrivalAirport==null){
                return
            }else{
                const{coordinates:depCoordinates}=state.departureAirport.location.geometry;
                const{coordinates:arriveCoordinates}=state.arrivalAirport.location.geometry;
                state.totalDistance=calcDistance([depCoordinates,arriveCoordinates],'km');
                state.points=[depCoordinates,arriveCoordinates];
            }
        },
        resetDepartureCoorinates:(state)=>{
            state.departureAirport=null;
            state.arrivalAirport=null;
            state.totalDistance=0;
        },
        setArrivalCoorinates:(state,action:PayloadAction<string>)=>{
            state.arrivalAirport=state.airportList.filter(airport=>airport.location.properties.name==action.payload)[0];
            console.log(state.departureAirport==null);
            if(state.departureAirport==null || state.arrivalAirport==null){
                return
            }else{
                const{coordinates:depCoordinates}=state.departureAirport.location.geometry;
                const{coordinates:arriveCoordinates}=state.arrivalAirport.location.geometry;
                state.totalDistance=calcDistance([depCoordinates,arriveCoordinates],'km');
                state.points=[depCoordinates,arriveCoordinates];
            }
        },
        resetArrivalCoorinates:(state)=>{
            state.departureAirport=null;
            state.arrivalAirport=null;
            state.totalDistance=0;
        },
        calculateWaypoints:(state,action:PayloadAction<Coordinate[]>)=>{
            state.points=action.payload
            const modWps=new Route(state.points)
            
            state.waypoints=modWps.points as IWayPoint[]
            state.totalDistance=modWps.points.map(el=>el.distance).reduce((a,b)=>a+b)
            console.log(state.waypoints);
            
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(findAirportHandler.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.airportList=action.payload
            console.log(state.airportList);
        }).addCase(findAirportHandler.rejected,(state,action)=>{
            console.log('rejected');
            state.airportList=[]
        })
    }
})
export const {
            setArrivalCoorinates,
            setDepartureCoorinates,
            resetArrivalCoorinates,
            resetDepartureCoorinates,

            calculateWaypoints
            }=flighPlanSlice.actions;
export default flighPlanSlice.reducer