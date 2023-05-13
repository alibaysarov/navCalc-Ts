import { Coordinate } from "ol/coordinate";
import {getDistance} from 'ol/sphere';

interface ICalcDistanceProps{
(coords:Coordinate[]|number[]|any[],units:'km'|'nm'|'sm'):number
}
export const calcDistance:ICalcDistanceProps=(coords:Coordinate[]|number[]|any[],units='km')=>{
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