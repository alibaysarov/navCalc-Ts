import { Coordinate } from "ol/coordinate";
import {getDistance} from 'ol/sphere';
import { computeHeading,LatLng } from "spherical-geometry-js";
import * as geomag from 'geomag';

export type ICoord=Coordinate[]|number[]|any[]


interface ICalcDistanceProps{
(coords:ICoord,units:'km'|'nm'|'sm'):number
}
export const calcDistance:ICalcDistanceProps=(coords:ICoord,units='km')=>{
    const unitsOBj={
        km:1,
        nm:1.852,
        sm:1.609,
    }
    let totalDistance:number=0;
    for (let i = 0; i < coords.length-1; i++) {
        totalDistance+=getDistance(coords[i],coords[i+1]);
    }
    return totalDistance/1000/unitsOBj[units];
}

function time_convert(num:number)
 { 
  const hours = Math.floor(num / 60);  
  const minutes =num % 60;
  return `${hours}:${minutes.toFixed(0).padStart(2,'0')}`;         
}
interface ILegDistanceProp{
    (leg:ICoord,units:'km'|'nm'|'sm'):number
}

 const getLegDistance:ILegDistanceProp=(leg:ICoord,units='km')=>{
    const unitsOBj={
        km:1,
        nm:1.852,
        sm:1.609,
    }
    const [start,end]=leg;
    return getDistance(start,end)/1000/unitsOBj[units];
    
}

interface ILegInterface{
    coordinates:ICoord
    time:number
    speed:number
    distance:number
    bearing:number
    getLegDistance:(units:"km"|'nm'|'sm')=>number
    getHeading:()=>number,
    getTime:()=>number,
    getMagneticVariation:()=>number
}

export class Leg implements ILegInterface{
    coordinates: Coordinate[] | number[]|any[];
    speed:number
    time:number
    distance:number
    bearing:number
    constructor(coordinates:Coordinate[] | number[]|any[],speed=200){
        this.coordinates=coordinates
        this.speed=speed
        this.distance=this.getLegDistance()
        this.time=this.getTime()
        this.bearing=this.getHeading()
    }
    getTime(){
        return this.distance/this.speed
    }
    getLegDistance(units='km'){
        const unitsOBj={
            km:1,
            nm:1.852,
            sm:1.609,
        }
        const [start,end]=this.coordinates;
        return getDistance(start,end)/1000;
    };
    getHeading(){
        const [start,end]=this.coordinates;

        const {declination}=geomag.field(start[1],start[0])
        
        console.log(declination);
        const from=new LatLng(start[1],start[0])
        const to=new LatLng(end[1],end[0])
        const magnetHeading=computeHeading(from,to)-declination
        const toDegrees=(num:number)=>{
            
            if(num>360){
                return num-360
            }
            if(num<0){
                return 360+num;
            }
            return num;
        }
        return toDegrees(magnetHeading);
    }
    getMagneticVariation(){
        return 123
    }
}

 export interface IWayPoint{
    name?:string
    coordinates:ICoord,
    bearing:number|null,
    time:number|null,
    distance:number|null
}
interface IRouteInterface{
    points:ICoord|IWayPoint[],
    speed:number,
    calcWps:()=>IWayPoint[]
}

export class Route implements IRouteInterface{
    speed: number;
    points:ICoord|IWayPoint[]
    constructor(points:ICoord,speed=200){
        this.speed=speed
        this.points=points;
        this.points=this.calcWps()
    }
    calcWps(){
        // distance coords time bearing
        this.points=this.points.map((point,idx,arr)=>{
            if(idx<arr.length-1){
                let {distance,bearing,time}=new Leg([arr[idx],arr[idx+1]],this.speed)
                return {
                    name:`Wp № ${idx+1}`,
                    coordinates:point,
                    distance,
                    time:time_convert(time*60),
                    bearing
                }
            }else{
                return{
                    name:`Wp № ${idx+1}`,
                    coordinates:null,
                    distance:null,
                    time:null,
                    bearing:null
                }
            }
        })
        return this.points
    };
}