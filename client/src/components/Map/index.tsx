import { Collection, Feature, Map, MapBrowserEvent } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM.js";
import React, { RefObject } from "react";
import View from "ol/View";
import {Draw, Modify, Snap} from 'ol/interaction.js';
import { useGeographic } from "ol/proj";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Coordinate } from "ol/coordinate";
import { Geometry, LineString, Point } from "ol/geom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { mapStyles, routeLineStyle } from "./styles";
import { addPoint,drawEndHandler } from "../../store/slices/routeLineSlice";
import { useSelector, useStore } from "react-redux";
import { lightGreen } from "@mui/material/colors";
const MapComponent = () => {
  
  const mapRef = React.useRef<RefObject<HTMLDivElement>>();

  const tileLayer = new TileLayer({
    source: new OSM(),
  });


  const dispatch=useAppDispatch()
  // const {points}=useAppSelector(state=>state.routeLine)



  const source= new VectorSource();
  const points=[[37,55],[0,0]]
  const routeLine=new Feature({
    geometry:new LineString(points,'XY'),
    name:'routeLine'
  })
  const pointTostick=new Feature({
    geometry:new Point([37,55],'XY'),
    name:'stickPoint'
  })
  source.addFeature(routeLine)
  source.addFeature(pointTostick)
  console.log(source.getFeatures());
  const vector = new VectorLayer({
    source: source,
    style: routeLineStyle 
  });
  
  const modify = new Modify({source: source});
  const draw = new Draw({
    source: source,
    type: 'LineString',
  });
  const snap = new Snap({
    source: source,
    features:new Collection([pointTostick]),
    pixelTolerance:30,
    edge:true,
    vertex:true
  });
  

  const [lines,setLines]=React.useState<Coordinate[]>([])
  const [count,setCount]=React.useState<number>(0)
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
    const navMap = new Map({
      target: mapRef.current,
      layers: [tileLayer,vector],
      controls: [],
      view: new View({
        center: [37, 55],
        zoom: 4,
      }),
    });
    navMap.addInteraction(modify)
    const addInteractions=():void=>{
      navMap.addInteraction(draw)
      navMap.addInteraction(snap)
    }
    const drawHandler=(e:MapBrowserEvent<any>)=>{
      // navMap.removeInteraction(draw)
      // navMap.removeInteraction(snap)
      addInteractions()
      if(currentValue==1){
        
        console.log(draw);
        // console.log(e.coordinate);
        // draw.appendCoordinates([e.coordinate])
      }
    }
    navMap.on('click',drawHandler);
    draw.on('drawend',(e:DrawEvent)=>{
      const drawnLineCoords=e.feature.getGeometry().getCoordinates();
      
        dispatch(drawEndHandler());
         console.log(drawnLineCoords);
      
      
    })
    draw.on('drawstart',(e:DrawEvent)=>{
      // console.log();
      const line=source.getFeatures()[0]
      // draw.extend(line)
      // console.log()
      if (currentValue==1) {
        console.log('Вы уже нарисовали линию');
        draw.finishDrawing()
        
        // console.log();
      } else {
        console.log('Вы еще не нарисовали линию!');
      }
    })
    modify.on('modifyend',(e:ModifyEvent)=>{
      console.log(e.features);
    })

    navMap.on('contextmenu',()=>{
      console.log('right click');
      draw.abortDrawing();
    })
    
  }, []);

  return <div id="map" style={mapStyles} ref={mapRef}></div>;
};

export default MapComponent;
