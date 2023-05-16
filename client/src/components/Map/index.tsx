import { Collection, Feature, Map, MapBrowserEvent } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM.js";
import React, { RefObject } from "react";
import View from "ol/View";
import {Draw, Modify, Snap} from 'ol/interaction.js';
import { fromLonLat, useGeographic } from "ol/proj";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Coordinate } from "ol/coordinate";
import { Geometry, LineString, Point } from "ol/geom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { mapStyles, routeLineStyle } from "./styles";
import { addPoint,drawEndHandler } from "../../store/slices/routeLineSlice";
import { useSelector, useStore } from "react-redux";
import { calculateWaypoints } from "../../store/slices/flighPlanSlice";

const MapComponent = () => {
  
  const mapRef = React.useRef<RefObject<HTMLDivElement>>();

  const tileLayer = new TileLayer({
    source: new OSM(),
  });

  const {points}=useAppSelector(state=>state.flightPlan)
  const dispatch=useAppDispatch()
  // const {points}=useAppSelector(state=>state.routeLine)



  
  
  
  
  

  
  const store=useStore()
  const selectLineCount=function(state){
    
    return state.routeLine.lineCount
  }
  let currentValue:number;
  const changeLine=()=>{
    let previousValue:number = currentValue;
    currentValue=selectLineCount(store.getState());
  }

  // const {lineCount}=useAppSelector(st=>st.routeLine)
  store.subscribe(changeLine)
  
  React.useEffect(() => {

    
    useGeographic();
    const source= new VectorSource();
    const pointTostick=new Feature({
      geometry:new Point([37,55],'XY'),
      name:'stickPoint'
    })
  const modify = new Modify({source: source});
  
  const snap = new Snap({
    source: source,
    features:new Collection([pointTostick]),
    pixelTolerance:30,
    edge:true,
    vertex:true
  });

  const vector = new VectorLayer({
    source: source,
    style: routeLineStyle ,
    
  });
  const routeLine=new Feature({
    geometry:new LineString(points,'XY'),
    name:'routeLine'
  })
  if(points.length>1){
    
    routeLine.getGeometry()?.setCoordinates(points)
    
    source.addFeature(routeLine)
  }else{
    console.log('1st render');
    routeLine.getGeometry()?.setCoordinates([[],[]])
    
    source.addFeature(routeLine)
  }
  const draw = new Draw({
    source: source,
    type: 'LineString',
  });
  
  
    const navMap = new Map({
      target: mapRef.current,
      layers: [tileLayer,vector],
      controls: [],
      view: new View({
        center:[37, 55],
        zoom: 4,
      }),
    });
    
    

    navMap.addInteraction(modify)
    const addInteractions=():void=>{
      navMap.addInteraction(draw)
      navMap.addInteraction(snap)
    }
    const drawHandler=(e:MapBrowserEvent<any>)=>{
      
      addInteractions()
      
    }
    navMap.on('click',drawHandler);
    draw.on('drawend',(e:DrawEvent)=>{
      const drawnLineCoords=e.feature.getGeometry().getCoordinates();
      
      dispatch(calculateWaypoints(drawnLineCoords))
        dispatch(drawEndHandler());
      
      
    })
    draw.on('drawstart',(e:DrawEvent)=>{
      
      const line=source.getFeatures()[0]
      
      if (currentValue==1) {
        console.log('Вы уже нарисовали линию');
        draw.finishDrawing()  
      } else {
        console.log('Вы еще не нарисовали линию!');
      }
    })
    modify.on('modifyend',(e:ModifyEvent)=>{
      const targetFeature= e.features.getArray()[0]
      dispatch(calculateWaypoints(targetFeature.getGeometry().getCoordinates()))
      
    })

    navMap.on('contextmenu',()=>{
      
      draw.abortDrawing();
    })
    
  }, []);

  return <div id="map" style={mapStyles} ref={mapRef}></div>;
};

export default MapComponent;
