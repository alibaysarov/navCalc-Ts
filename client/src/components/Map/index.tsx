import { Map } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM.js";
import React, { RefObject } from "react";
import View from "ol/View";
import { useGeographic } from "ol/proj";
const MapComponent = () => {
  const styles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    minHeight: "500px",
  };
  const mapRef = React.useRef<RefObject<HTMLDivElement>>();
  const tileLayer = new TileLayer({
    source: new OSM(),
  });
  React.useEffect(() => {
    useGeographic();
    const navMap = new Map({
      target: mapRef.current,
      layers: [tileLayer],
      controls: [],
      view: new View({
        center: [37, 55],
        zoom: 4,
      }),
    });
  }, []);

  return <div id="map" style={styles} ref={mapRef}></div>;
};

export default MapComponent;
