import { Feature, Map, MapBrowserEvent } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM.js";
import React, { RefObject } from "react";
import View from "ol/View";
import {Draw, Modify, Snap} from 'ol/interaction.js';
import { useGeographic } from "ol/proj";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Coordinate } from "ol/coordinate";
import { Geometry, LineString } from "ol/geom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { mapStyles, routeLineStyle } from "./styles";
import { addPoint } from "../../store/slices/routeLineSlice";
import { useStore } from "react-redux";
const MapComponent = () => {
  
  const mapRef = React.useRef<RefObject<HTMLDivElement>>();

  const tileLayer = new TileLayer({
    source: new OSM(),
  });


  const dispatch=useAppDispatch()
  const {points}=useAppSelector(state=>state.routeLine)



  const source= new VectorSource();
  
  const routeLine=new Feature({
    geometry:new LineString(points,'XY'),
    name:'routeLine'
  })
  source.addFeature(routeLine)
  const vector = new VectorLayer({
    source: source,
    style: routeLineStyle 
  });
  
  const modify = new Modify({source: source});
  const draw = new Draw({
    source: source,
    type: 'Point',
  });
  const snap = new Snap({source: source});
  const store=useStore()
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
      console.log(e.coordinate);
      const newPoint:Coordinate=e.coordinate
        
      dispatch(addPoint(newPoint))
      
      const newLine=store?.getState().routeLine.points
      console.log(newLine);
      if (newLine.length>1) {
        routeLine.getGeometry()?.setCoordinates(newLine,"XY")
        vector.changed()
      }
      
      
      
    }
    const modifyHandler=(e:MapBrowserEvent<any>)=>{
      const modifiedCoords:Coordinate[]= e.features.getArray()[0].getGeometry().getCoordinates();
      setPoints(prev=>{
        routeLine.getGeometry()?.setCoordinates(modifiedCoords)
        return [...modifiedCoords]
      })
      vector.changed()
    }
    navMap.on('click',drawHandler)
    modify.on('modifyend',modifyHandler)
  }, []);

  return <div id="map" style={mapStyles} ref={mapRef}></div>;
};

export default MapComponent;
